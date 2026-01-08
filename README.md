[screen.png](https://github.com/darthgawd/onyxai-mp3-nft-player/blob/main/screen.png)

# Onyx MP3 NFT Player (Winamp-Style) — Solana Devnet + IPFS (Pinata)

A **wallet-native audio library** for **MP3 preview NFTs** on Solana, with a **Winamp-style Webamp UI**.

This repo intentionally separates responsibilities:

- **Frontend (Vite + React):** connect wallet, load NFTs owned by the wallet, fetch metadata JSON from IPFS, play **MP3 previews** in Webamp.
- **Node scripts (in `scripts/mint/`):** upload MP3 + artwork + metadata JSON to IPFS (Pinata), then mint the NFT on **Solana devnet**.

This is built as a DevOps/security web3 application: clear trust boundaries, reproducible scripts, and defensive guards around untrusted metadata.

---

1) **Asset pipeline** (MP3 + cover art → IPFS)
2) **Identity pipeline** (metadata JSON controls title/cover/audio links)
3) **Mint pipeline** (NFT minted to a wallet on devnet)
4) **Client library** (browser reads wallet NFTs + plays preview audio)




### Scripts
- `scripts/docgen-functions.mjs` — generates `DOCS_FUNCTIONS.md`
- `scripts/DOCS_FUNCTIONS.md` — auto-generated function inventory
- `scripts/mint/` — minting pipeline scripts:
  - `config.js`
  - `createMetadata.js`
  - `pinataUpload.js`
  - `uploadMetadata.js`
  - `mintNft.js`
  - `testUpload.js`

### Frontend source
- `src/main.jsx` — app bootstrap + providers
- `src/App.jsx` — main app view
- `src/layout/AppLayout.jsx` — layout container
- `src/components/WalletBar.jsx` — wallet connect UI
- `src/components/LibraryList.jsx` — list of loaded Onyx MP3 NFTs
- `src/hooks/useOnyxMp3Nfts.js` — loads wallet NFTs + metadata + maps tracks
- `src/lib/isOnyxMp3Nft.js` — identifies whether an NFT belongs to this app
- `src/WebampPlayer.jsx` — Webamp integration (playlist + playback)
- `src/App.css`, `src/index.css` — styles

---

## Tech stack

- **Vite + React** (frontend)
- **Solana Wallet Adapter** (wallet connect; Phantom works out of the box)
- **UMI + mpl-token-metadata** (browser-safe NFT loading)
- **Webamp** (Winamp-style player UI)
- **Pinata** (IPFS pinning for MP3/art/metadata)
- **Node scripts** for minting + uploads (keeps secrets out of browser)

---

## Setup

### Prereqs
- Node.js (LTS recommended)
- pnpm
- Phantom wallet browser extension
- Pinata API access (JWT or API key/secret depending on your script)

### Install
```bash
pnpm install

