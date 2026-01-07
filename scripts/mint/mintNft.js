import { Metaplex, keypairIdentity } from "@metaplex-foundation/js";
import { wallet, connection } from "./config.js";

async function main() {
  const metadataUri = process.argv[2];
  if (!metadataUri) {
    console.error("Usage: node scripts/mint/mintNft.js <METADATA_URI>");
    process.exit(1);
  }

  const metaplex = Metaplex.make(connection).use(keypairIdentity(wallet));

  const { nft } = await metaplex.nfts().create({
    uri: metadataUri,
    name: "Onyx MP3 NFT #${Date.now()}",
    sellerFeeBasisPoints: 0,
  });

  console.log("MINTED");
  console.log("MINT_ADDRESS=", nft.address.toBase58());
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
