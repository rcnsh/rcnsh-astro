import { useEffect, useState } from "react";

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

  const progressPercent = (currentProgress / duration) * 100;

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((currentProgress) => {
          if (currentProgress < duration - 1000) {
            return currentProgress + 1000;
          } else {
            clearInterval(interval);
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
  }, [isPlaying, duration]);

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
          {isPlaying && new Date(duration).toISOString().slice(14, 19)}
        </span>
      </p>
      <div
        className={`h-1 bg-[#cdc8c2] transition-all duration-1000 ease-in-out`}
        style={{ width: `${progressPercent}%` }}
      ></div>
    </>
  );
}
