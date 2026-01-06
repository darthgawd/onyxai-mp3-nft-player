export default function AppLayout({ children }) {
  return (
    <div style={styles.app}>
      <aside style={styles.sidebar}>
        <h3>Library</h3>
        <p>(NFTs will appear here)</p>
      </aside>

      <main style={styles.main}>{children}</main>

      <aside style={styles.sidebar}>
        <h3>Now Playing</h3>
        <p>(Track info)</p>
      </aside>
    </div>
  );
}

const styles = {
  app: {
    display: "grid",
    gridTemplateColumns: "200px 1fr 200px",
    height: "100vh",
    background: "#111",
    color: "#eee",
    fontFamily: "sans-serif",
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
