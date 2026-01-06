import WalletBar from "../components/WalletBar";
import LibraryList from "../components/LibraryList";


export default function AppLayout({ children }) {
  return (
    <div style={styles.shell}>
      <WalletBar />

      <div style={styles.app}>
       <aside style={styles.sidebar}>
  <h3>Library</h3>
  <LibraryList
    items={[
      {
        id: "show",
        metadata: {
          name: "Onyx Demo Track",
          image: "https://picsum.photos/200",
          attributes: [{ trait_type: "app", value: "onyx" }],
          properties: {
            files: [{ uri: "ipfs://demo/track.mp3", mimeType: "audio/mpeg" }],
          },
        },
      },
      {
        id: "hide",
        metadata: {
          name: "Random NFT",
          image: "https://picsum.photos/200",
        },
      },
    ]}
  />
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

