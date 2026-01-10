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


CI/CD Pipeline (GitHub Actions → GitHub Pages)

This project uses GitHub Actions to implement a full CI/CD pipeline for the frontend, with automated deployment to GitHub Pages. The pipeline follows modern DevOps best practices using artifact-based deployments (no Jekyll, no gh-pages branch).

Overview

CI/CD Engine: GitHub Actions

Build Tooling: Vite + React

Package Manager: pnpm

Node Version: 20

Hosting: GitHub Pages

Deployment Type: Static SPA

All deployments originate from the main branch after passing automated checks.

Pipeline Triggers

The workflow runs on:

Push to main → CI + deploy

Pull requests → CI only (no deploy)

Manual trigger → rebuild/redeploy

Pipeline Stages

1. Checkout
Fetches the repository source code.

2. Environment Setup
Configures Node.js 20 and pnpm with dependency caching for reproducible builds.

3. Install Dependencies

pnpm install --frozen-lockfile


Ensures dependency consistency and prevents drift.

4. Lint (Quality Gate)

pnpm lint


Frontend code (src/) is linted with browser globals

Node-based mint scripts (scripts/) are linted with Node globals
Lint failures intentionally block deployment.

5. Build

pnpm build


Vite builds the application into a static dist/ directory using a GitHub Pages–compatible base path.

6. Artifact Upload
The build output (dist/) is uploaded as an immutable deployment artifact.

7. Deploy to GitHub Pages
The artifact is deployed using GitHub’s official Pages deployment action.

Workflow File

Location:

.github/workflows/pages.yml


This workflow cleanly separates:

build

artifact handling

deployment

Live Deployment

The application is available at:

https://darthgawd.github.io/onyxai-mp3-nft-player/

GitHub Pages URLs follow the pattern:

https://<github-username>.github.io/<repository-name>/

DevOps Notes

No Jekyll or static-site generators are used

No deployment branches are required

All deployments are artifact-based

CI must pass before CD

Build and deploy are decoupled

The pipeline mirrors real-world production SPA deployments

Future Enhancements

Staging vs production environments

Tag-based releases

CodeQL security scanning (DevSecOps)

Dependabot dependency updates

Manual approval gates for NFT mint workflows

add this here
