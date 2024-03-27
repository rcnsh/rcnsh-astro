import { useEffect, useState } from "react";
import type { songData } from "types";
import Vibrant from "node-vibrant";

export default function MusicBar({
  duration,
  progress,
  isPlaying,
}: {
  duration: number;
  progress: number;
  isPlaying: boolean;
}) {
  async function updateUI() {
    await fetch("https://rcn.sh/api/nowPlaying")
      .then((response) => response.json() as Promise<songData>)
      .then((data) => {
        const image = document.getElementById(
          "spotify-image",
        ) as HTMLImageElement;

        image.src = data.albumImageUrl;
        document.getElementById("nowPlayingTitle")!.innerText = data.title;
        document.getElementById("nowPlayingArtist")!.innerText = data.artist;
        document.getElementById("nowPlayingAlbum")!.innerText = data.album;

        setDuration(data.songLength);
        setProgress(data.songProgress);
        setIsSongPlaying(data.isPlaying);
        if (image) {
          Vibrant.from(image.src)
            .getPalette()
            .then((palette) => {
              const vibrantColour = palette.Vibrant!.hex;
              const mutedColour = palette.Muted!.hex;
              const darkMutedColour = palette.DarkMuted!.hex;

              const element = document.getElementById("spotify-background");
              element!.style.background = `linear-gradient(-45deg, ${vibrantColour}, ${mutedColour}, ${darkMutedColour}`;
              element!.style.boxShadow = `0 0 15px 10px ${darkMutedColour}`;
            });
        }
      });
  }
  const [isSongPlaying, setIsSongPlaying] = useState<boolean>(isPlaying);
  const [currentProgress, setProgress] = useState(progress);
  const [currentSongDuration, setDuration] = useState(duration);
  const progressPercent = (currentProgress / currentSongDuration) * 100;

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isSongPlaying) {
      interval = setInterval(() => {
        setProgress((currentProgress) => {
          if (currentProgress < currentSongDuration) {
            return currentProgress + 1000;
          } else {
            clearInterval(interval);
            return currentProgress;
          }
        });
      }, 1000);
    }
    const updateUIInterval = setInterval(updateUI, 5000);

    return () => {
      if (interval) {
        clearInterval(interval);
      }
      clearInterval(updateUIInterval);
    };
  }, [isPlaying, currentSongDuration]);

  return (
    <>
      <p className="font-dark text-xs text-[#cdc8c2] flex justify-between border-b-2 border-[#cdc8c2] pb-1">
        <span>
          {isPlaying && new Date(currentProgress).toISOString().slice(14, 19)}
        </span>
        <span>
          {isPlaying &&
            new Date(currentSongDuration).toISOString().slice(14, 19)}
        </span>
      </p>
      <div
        className={`h-1 bg-[#cdc8c2] transition-all duration-1000 ease-in-out ${isPlaying ? "block" : "hidden"}`}
        style={{ width: `${progressPercent}%` }}
      ></div>
    </>
  );
}