import fs from "fs";
import path from "path";
import FormData from "form-data";
import fetch from "node-fetch";
import { PINATA_JWT } from "./config.js";

export async function pinFileToIpfs(filePath) {
  const abs = path.resolve(filePath);

  if (!fs.existsSync(abs)) {
    throw new Error(`File not found: ${abs}`);
  }

  const form = new FormData();
  form.append("file", fs.createReadStream(abs));

  const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${PINATA_JWT}`,
      ...form.getHeaders(),
    },
    body: form,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Pinata upload failed (${res.status}): ${text}`);
  }

  const json = await res.json();
  if (!json?.IpfsHash) {
    throw new Error(`Unexpected Pinata response: ${JSON.stringify(json)}`);
  }

  return `ipfs://${json.IpfsHash}`;
}

