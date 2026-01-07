import { useOnyxMp3Nfts } from "../hooks/useOnyxMp3Nfts";
import { useWallet } from "@solana/wallet-adapter-react";

import WalletBar from "../components/WalletBar";
import LibraryList from "../components/LibraryList";

export default function AppLayout({ children }) {
  const { publicKey } = useWallet();
  const { items } = useOnyxMp3Nfts(publicKey);

  return (
    <div style={styles.shell}>
      <WalletBar />

      <div style={styles.app}>
        <aside style={styles.sidebar}>
          <h3>Library</h3>
          <LibraryList items={items} />
        </aside>

        <main style={styles.main}>{children}</main>
      </div>
    </div>
  );
}

const styles = {
  shell: {
    position: "fixed",
    inset: 0,
    background: "#111",
    color: "#eee",
    fontFamily: "sans-serif",
  },
  app: {
    display: "grid",
    gridTemplateColumns: "220px 1fr",
    height: "calc(100% - 49px)",
  },
  sidebar: {
    padding: "1rem",
    borderRight: "1px solid #333",
  },
  main: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};
