import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export default function WalletBar() {
  const { publicKey } = useWallet();

  return (
    <div style={styles.bar}>
      <WalletMultiButton />
      <div style={styles.key}>
        {publicKey ? `Connected: ${publicKey.toBase58()}` : "Not connected"}
      </div>
    </div>
  );
}

const styles = {
  bar: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px",
    borderBottom: "1px solid #333",
  },
  key: {
    fontSize: "12px",
    opacity: 0.9,
    wordBreak: "break-all",
  },
};
