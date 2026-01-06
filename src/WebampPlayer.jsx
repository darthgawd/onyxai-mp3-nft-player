import { useEffect, useRef } from "react";
import Webamp from "webamp";

export default function WebampPlayer() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const webamp = new Webamp({
      initialTracks: [
        {
          metaData: {
            artist: "Onyx Demo",
            title: "Test Track",
          },
          url: "/audio/demo.mp3",
        },
      ],
    });

    webamp.renderWhenReady(containerRef.current);

    return () => {
      webamp.dispose();
    };
  }, []);

  return <div ref={containerRef} />;
}

