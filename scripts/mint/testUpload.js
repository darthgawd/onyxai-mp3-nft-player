import path from "path";
import { pinFileToIpfs } from "./pinataUpload.js";

async function main() {
  const filePath = process.argv[2];
  if (!filePath) {
    console.error("Usage: node scripts/mint/testUpload.js <path-to-file>");
    process.exit(1);
  }

  const uri = await pinFileToIpfs(filePath);
  console.log(`Uploaded: ${path.resolve(filePath)}`);
  console.log(`IPFS URI: ${uri}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

