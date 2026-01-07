import fs from "fs";
import path from "path";

export function buildOnyxMp3Metadata({ name, artist, imageUri, audioUri }) {
  return {
    name,
    artist,
    image: imageUri,
    attributes: [{ trait_type: "app", value: "onyx" }],
    properties: {
      files: [
        { uri: audioUri, mimeType: "audio/mpeg", category: "audio" },
        { uri: imageUri, mimeType: "image/*", category: "image" },
      ],
    },
  };
}

export function writeJsonTemp(obj) {
  const outDir = path.resolve("output");
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const filePath = path.join(outDir, `metadata-${Date.now()}.json`);
  fs.writeFileSync(filePath, JSON.stringify(obj, null, 2), "utf8");
  return filePath;
}
