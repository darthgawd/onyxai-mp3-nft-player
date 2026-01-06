import { useEffect, useState } from "react";

export function useOnyxMp3Nfts(publicKey) {
  const [items, setItems] = useState(null);

  useEffect(() => {
    // For now: just prove the hook reacts to wallet connect/disconnect.
    if (!publicKey) {
      setItems([]);
      return;
    }

    setItems(null); // shows "Loading…"
    // Next step we will actually fetch from devnet and setItems(...)
    setTimeout(() => setItems([]), 500);
  }, [publicKey]);

  return { items };
}

