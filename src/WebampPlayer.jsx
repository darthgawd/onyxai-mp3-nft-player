// src/WebampPlayer.jsx
import { useEffect, useMemo, useRef } from "react";
import Webamp from "webamp";
import { isOnyxMp3Nft } from "./lib/isOnyxMp3Nft";

function ipfsToHttps(uri) {
  if (!uri) return uri;
  if (uri.startsWith("ipfs://")) {
    return uri.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/");
  }
  return uri;
}

function pickMp3Uri(metadata) {
  const files = metadata?.properties?.files || [];
  const mp3 = files.find(
    (f) => f?.mimeType === "audio/mpeg" || f?.uri?.toLowerCase().includes(".mp3"),
  );
  return mp3?.uri || null;
}

export default function WebampPlayer({ items }) {
  const containerRef = useRef(null);

  // Build Webamp tracks from the NFTs we loaded
  const tracks = useMemo(() => {
    const list = (items || [])
      .filter((nft) => isOnyxMp3Nft(nft.metadata))
      .map((nft) => {
        const md = nft.metadata;
        const mp3Uri = pickMp3Uri(md);
        if (!mp3Uri) return null;

        return {
          metaData: {
            artist: md.artist || "Unknown Artist",
            title: md.name || "Untitled",
          },
          url: ipfsToHttps(mp3Uri),
        };
      })
      .filter(Boolean);

    return list;
  }, [items]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Don’t boot Webamp until we actually have loaded items
    if (items === null) return;

    // If you have no NFT tracks, you can either show nothing or keep demo.
    // Here: show nothing (no demo), just don’t render Webamp.
    if (!tracks.length) return;

    const webamp = new Webamp({
      initialTracks: tracks,
    });

    webamp.renderWhenReady(containerRef.current);

    return () => {
      webamp.dispose();
    };
  }, [items, tracks]);

  if (items === null) return <div>Loading player…</div>;
  if (!tracks.length) return <div>No playable Onyx MP3 NFT tracks found.</div>;

  return <div ref={containerRef} />;
}

