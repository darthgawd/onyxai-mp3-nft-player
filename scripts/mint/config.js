import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { Keypair, clusterApiUrl, Connection } from "@solana/web3.js";

dotenv.config();

const REQUIRED = ["PINATA_JWT", "SOLANA_KEYPAIR_PATH"];

for (const key of REQUIRED) {
  if (!process.env[key]) {
    throw new Error(`Missing required env var: ${key}`);
  }
}

export const PINATA_JWT = process.env.PINATA_JWT;
export const CLUSTER = process.env.SOLANA_CLUSTER || "devnet";

export const connection = new Connection(clusterApiUrl(CLUSTER), "confirmed");


const keypairPath = process.env.SOLANA_KEYPAIR_PATH
  .replace(/^\$HOME/, process.env.HOME)
  .replace(/^~\//, `${process.env.HOME}/`);

const secretKey = JSON.parse(fs.readFileSync(path.resolve(keypairPath), "utf8"));

export const wallet = Keypair.fromSecretKey(
  Uint8Array.from(secretKey)
);

