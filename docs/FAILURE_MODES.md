# Failure Modes (Onyx MP3 NFT Player)

This doc lists what can break, what the user sees, and what we do about it.

---

## 1) Wallet not connected
**Symptom:** No publicKey
**Expected UI:** Show connect prompt / empty library
**Mitigation:** `useOnyxMp3Nfts` returns `[]` and does not fetch

---

## 2) Devnet RPC issues
**Symptom:** fetchAllDigitalAssetByOwner fails / times out
**Expected UI:** “Could not load NFTs. Try again.”
**Mitigation:** catch errors; keep UI stable; allow retry

---

## 3) Metadata URI missing
**Symptom:** asset has no `metadata.uri`
**Expected UI:** ignore NFT
**Mitigation:** skip safely

---

## 4) Placeholder metadata URI
**Symptom:** `PASTE_REAL_HASH_HERE` or other placeholder strings
**Expected UI:** ignore NFT
**Mitigation:** skip early (guard clause)

---

## 5) IPFS gateway down / slow
**Symptom:** metadata fetch fails
**Expected UI:** ignore that NFT; optionally show a warning count
**Mitigation:** try/catch per NFT so one failure doesn’t crash the whole list

---

## 6) Metadata JSON malformed
**Symptom:** JSON parse error / missing fields
**Expected UI:** ignore NFT
**Mitigation:** try/catch; validate required fields before mapping

---

## 7) NFT is not an Onyx MP3 NFT
**Symptom:** random NFTs in wallet
**Expected UI:** ignore NFT
**Mitigation:** strict `isOnyxMp3Nft` gate (app marker + mp3)

---

## 8) MP3 URL not playable
**Symptom:** 403/404, CORS, wrong mime type
**Expected UI:** track shows but playback fails gracefully
**Mitigation:** prefer proper gateway URLs; optionally preflight HEAD checks later

---

## 9) Webamp lifecycle issues
**Symptom:** multiple instances, memory leak, stale playback
**Expected UI:** only one Webamp instance
**Mitigation:** dispose Webamp on unmount; keep player isolated
