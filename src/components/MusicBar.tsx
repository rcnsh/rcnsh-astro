import { useEffect, useState } from "react";
import type { songData } from "types";

export default function MusicBar({
  duration,
  progress,
  isPlaying,
}: {
  duration: number;
  progress: number;
  isPlaying: boolean;
}) {
  const [currentProgress, setProgress] = useState(progress);
  const [currentSongDuration, setDuration] = useState(duration);
  const progressPercent = (currentProgress / currentSongDuration) * 100;

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((currentProgress) => {
          if (currentProgress < currentSongDuration) {
            return currentProgress + 1000;
          } else {
            clearInterval(interval);
            fetch("https://rcn.sh/api/nowPlaying")
              .then((response) => response.json() as Promise<songData>)
              .then((data) => {
                document.getElementById("nowPlayingTitle")!.innerText =
                  data.title;
                document.getElementById("nowPlayingArtist")!.innerText =
                  data.artist;
                document.getElementById("nowPlayingAlbum")!.innerText =
                  data.album;
                (
                  document.getElementById("spotify-image") as HTMLImageElement
                ).src = data.albumImageUrl;
                setDuration(data.songLength);
                setProgress(data.songProgress);
              })
              .catch((error) => {
                console.error("Error:", error);
              });
            return currentProgress;
          }
        });
      }, 1000);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
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
        className="h-1 bg-[#cdc8c2] transition-all duration-1000 ease-in-out"
        style={{ width: `${progressPercent}%` }}
      ></div>
    </>
  );
}
