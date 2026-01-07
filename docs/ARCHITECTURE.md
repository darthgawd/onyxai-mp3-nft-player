# Architecture (Onyx MP3 NFT Player)

Wallet-native MP3 preview NFT library on Solana devnet with Winamp-style playback (Webamp). Assets + metadata live on IPFS (Pinata). Minting is Node-only.

---

## Trust boundary (non-negotiable)

### Browser (Vite + React)
**Role:** Read-only client
- Connect wallet (Phantom)
- Read NFTs owned by wallet (UMI + mpl-token-metadata)
- Fetch metadata JSON from IPFS gateway
- Filter to Onyx MP3 NFTs (`isOnyxMp3Nft`)
- Play preview audio (Webamp)

**Must NOT:**
- hold secrets (Pinata keys, private keys)
- mint NFTs
- upload full audio in any privileged way

### Node scripts (`scripts/mint/`)
**Role:** Sensitive operations + reproducible pipeline
- Upload MP3/art/metadata to IPFS (Pinata)
- Generate metadata JSON (identity)
- Mint NFT on Solana devnet

---

## Data flow (current)

Wallet → fetch owned NFTs → read metadata URI → fetch metadata JSON → validate (app marker + mp3) → map to tracks → Webamp playback

---

## Minting pipeline (current)

MP3 + art → Pinata/IPFS → build metadata JSON → upload metadata → mint NFT (devnet) → wallet owns NFT → frontend reads and plays preview

---

## Key modules

### Frontend
- `src/hooks/useOnyxMp3Nfts.js`: fetch owned NFTs, fetch metadata JSON, filter/map results
- `src/lib/isOnyxMp3Nft.js`: strict gate to include only Onyx MP3 NFTs
- `src/WebampPlayer.jsx`: encapsulated Webamp lifecycle (init/render/dispose)

### Scripts
- `scripts/mint/pinataUpload.js`: upload helper
- `scripts/mint/createMetadata.js`: metadata identity builder
- `scripts/mint/uploadMetadata.js`: upload metadata JSON (CLI)
- `scripts/mint/mintNft.js`: mint step (CLI)
- `scripts/mint/testUpload.js`: sanity test for Pinata config

