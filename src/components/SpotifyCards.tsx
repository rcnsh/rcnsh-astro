import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BentoGrid, BentoGridItem } from "./Bento";
import { Music3Icon } from "lucide-react";
export type Track = {
  artists: { name: string }[];
  songUrl: string;
  title: string;
  album: string;
  image: string;
};
export type Artist = {
  name: string;
  url: string;
  image: string;
  followers: Promise<string>;
};

export default function SpotifyCards() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [artists, setArtists] = useState<Artist[]>([]);

  useEffect(() => {
    (async () => {
      const response = await fetch("/api/spotify").then((res) => res.json());
      setTracks(response.tracks);
      setArtists(response.artists);
    })();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="flex flex-row mt-16"
    >
      <BentoGrid className="max-w-4xl mx-auto">
        {tracks.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            description={item.artists.map((artist) => artist.name).join(", ")}
            header={item.image}
            icon={<Music3Icon className="h-4 w-4 text-neutral-500" />}
            link={item.songUrl}
          />
        ))}
      </BentoGrid>
      <BentoGrid className="max-w-4xl mx-auto">
        {artists.map((item, i) => (
          <BentoGridItem
            key={i}
            link={item.url}
            title={item.name}
            header={item.image}
            icon={<Music3Icon className="h-4 w-4 text-neutral-500" />}
          />
        ))}
      </BentoGrid>
    </motion.div>
  );
}
