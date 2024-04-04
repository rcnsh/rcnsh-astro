import { useEffect, useState } from "react";
import type { songData } from "types";
import { backgroundColour } from "@lib/utils";

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
        document.getElementById("nowPlayingTitle")!.innerText = data.title;
        document.getElementById("nowPlayingArtist")!.innerText = data.artist;
        document.getElementById("nowPlayingAlbum")!.innerText = data.album;

        setDuration(data.songLength);
        setProgress(data.songProgress);
        setIsSongPlaying(data.isPlaying);

        backgroundColour();
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
    const updateUIInterval = setInterval(updateUI, 60000);

    return () => {
      if (interval) {
        clearInterval(interval);
      }
      clearInterval(updateUIInterval);
    };
  }, [isPlaying, currentSongDuration]);

  return (
    <>
      <p
        className={
          "font-dark text-xs text-[#cdc8c2] flex justify-between border-b-2 border-[#cdc8c2] pb-1"
        }
      >
        <span>
          {isPlaying && new Date(currentProgress).toISOString().slice(14, 19)}
        </span>
        <span>
          {isPlaying &&
            new Date(currentSongDuration).toISOString().slice(14, 19)}
        </span>
      </p>
      <div
        className={`h-1 bg-[#cdc8c2] transition-all duration-1000 ease-in-out`}
        style={{ width: `${progressPercent}%` }}
      ></div>
    </>
  );
}
