export function isOnyxMp3Nft(metadata) {
  if (!metadata) return false;

  // must have artwork
  if (!metadata.image) return false;

  // must be marked for this app
  const attrs = metadata.attributes || [];
  const hasAppMarker = attrs.some(
    (a) =>
      a.trait_type?.toLowerCase() === "app" &&
      a.value?.toLowerCase() === "onyx"
  );
  if (!hasAppMarker) return false;

  // must reference an mp3 file
  const files = metadata.properties?.files || [];
  const hasMp3 = files.some(
    (f) =>
      f.uri?.toLowerCase().includes(".mp3") ||
      f.mimeType === "audio/mpeg"
  );

  return hasMp3;
}

