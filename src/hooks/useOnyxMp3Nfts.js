import { useEffect, useMemo, useState } from "react";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { publicKey as umiPublicKey } from "@metaplex-foundation/umi";
import { fetchAllDigitalAssetByOwner } from "@metaplex-foundation/mpl-token-metadata";
import { isOnyxMp3Nft } from "../lib/isOnyxMp3Nft";

function ipfsToHttps(uri) {
  if (!uri) return uri;
  if (uri.startsWith("ipfs://")) {
    return uri.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/");
  }
  return uri;
}

export function useOnyxMp3Nfts(publicKey) {
  const [items, setItems] = useState(null);
  const umi = useMemo(() => createUmi("https://api.devnet.solana.com"), []);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      if (!publicKey) {
        setItems([]);
        return;
      }

      setItems(null);

      const owner = umiPublicKey(publicKey.toBase58());
      const assets = await fetchAllDigitalAssetByOwner(umi, owner);

      const out = [];
      for (const asset of assets) {
        const uri = asset?.metadata?.uri;
        if (!uri || uri.includes("PASTE_REAL_HASH_HERE")) continue;

        try {
          const res = await fetch(ipfsToHttps(uri));
          if (!res.ok) continue;

          const json = await res.json();

          if (isOnyxMp3Nft(json)) {
            out.push({
              id:
                asset.publicKey?.toString() ||
                asset.mint?.publicKey?.toString() ||
                uri,
              metadata: json,
            });
          }
        } catch {
          // ignore
        }
      }

      if (!cancelled) setItems(out);
    }

    run().catch((err) => {
      console.error("useOnyxMp3Nfts (UMI) failed:", err);
      if (!cancelled) setItems([]);
    });

    return () => {
      cancelled = true;
    };
  }, [publicKey, umi]);

  return { items };
}
