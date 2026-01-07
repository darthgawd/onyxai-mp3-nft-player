import { isOnyxMp3Nft } from "../lib/isOnyxMp3Nft";

export default function LibraryList({ items }) {
  const filtered = (items || []).filter((nft) => isOnyxMp3Nft(nft.metadata));

  if (!items) return <p>Loading…</p>;
  if (filtered.length === 0) return <p>No Onyx MP3 NFTs found.</p>;

  return (
    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
      {filtered.map((nft) => (
        <li key={nft.id} style={{ marginBottom: 8 }}>
          {nft.metadata.name}
        </li>
      ))}
    </ul>
  );
}
