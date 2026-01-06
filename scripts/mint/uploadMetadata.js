import path from "path";
import { pinFileToIpfs } from "./pinataUpload.js";
import { buildOnyxMp3Metadata, writeJsonTemp } from "./createMetadata.js";

async function main() {
  const args = process.argv.slice(2);

  const getArg = (flag) => {
    const i = args.indexOf(flag);
    return i !== -1 ? args[i + 1] : null;
  };

  const name = getArg("--name");
  const artist = getArg("--artist");
  const mp3Path = getArg("--mp3");
  const artPath = getArg("--art");

  if (!name || !artist || !mp3Path || !artPath) {
    console.error(
      "Usage: node scripts/mint/uploadMetadata.js --name <name> --artist <artist> --mp3 <mp3-path> --art <image-path>"
    );
    process.exit(1);
  }

  console.log("Uploading artwork...");
  const imageUri = await pinFileToIpfs(artPath);

  console.log("Uploading audio...");
  const audioUri = await pinFileToIpfs(mp3Path);

  const metadata = buildOnyxMp3Metadata({
    name,
    artist,
    imageUri,
    audioUri,
  });

  const metadataFile = writeJsonTemp(metadata);

  console.log("Uploading metadata...");
  const metadataUri = await pinFileToIpfs(metadataFile);

  console.log("DONE");
  console.log("IMAGE_URI=", imageUri);
  console.log("AUDIO_URI=", audioUri);
  console.log("METADATA_URI=", metadataUri);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

