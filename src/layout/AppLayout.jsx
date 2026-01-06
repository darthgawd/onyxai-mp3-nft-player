export default function AppLayout({ children }) {
  return (
    <div style={styles.app}>
      <aside style={styles.sidebar}>
        <h3>Library</h3>
        <p>(NFTs will appear here)</p>
      </aside>

      <main style={styles.main}>{children}</main>
    </div>
  );
}

const styles = {
app: {
  position: "fixed",
  inset: 0,
  display: "grid",
  gridTemplateColumns: "220px 1fr",
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

