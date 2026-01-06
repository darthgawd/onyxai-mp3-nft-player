export function useOnyxMp3Nfts() {
  return {
    items: [
      {
        id: "hook-proof",
        metadata: {
          name: "HOOK PROOF (not wallet yet)",
          image: "ipfs://x",
          attributes: [{ trait_type: "app", value: "onyx" }],
          properties: { files: [{ uri: "ipfs://x/test.mp3", mimeType: "audio/mpeg" }] },
        },
      },
    ],
  };
}

