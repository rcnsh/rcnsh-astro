import { cn } from "@lib/utils";
import React, { useEffect, useState } from "react";

type Game = {
  appid: number;
  game_image_url: string;
  playtime_2weeks: number;
  playtime_forever: number;
};

export const InfiniteMovingCardsAll = ({
  items,
  direction = "left",
  speed = "slow",
  pauseOnHover = false,
  className,
}: {
  items: Game[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  useEffect(() => {
    addAnimation();
  }, []);
  const [start, setStart] = useState(false);
  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }
  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards",
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse",
        );
      }
    }
  };
  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "60s");
      }
    }
  };
  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative max-w-full overflow-hidden  [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className,
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          " flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap",
          start && "animate-scroll ",
          pauseOnHover && "hover:[animation-play-state:paused]",
        )}
      >
        {items.map((item, index) => (
          <li
            className="flex flex-col items-center p-4 rounded-lg shadow-lg bg-[#101010] hover:scale-[1.03] transition-transform duration-300 ease-in-out m-[6px]"
            key={item.appid}
          >
            <a
              href={`https://store.steampowered.com/app/${item.appid}`}
              target="_blank"
              rel="noopener noreferer"
            >
              <img
                src={item.game_image_url}
                alt={"Steam: " + item.appid.toString()}
                className={"w-150 h-225 rounded-lg pointer-events-none"}
                width={150}
                height={225}
                loading={index <= 7 ? "eager" : "lazy"}
              />
            </a>
            <p
              className={
                "text-white py-1 text-sm text-center pointer-events-none"
              }
            >
              Total playtime:{" "}
              {item.playtime_forever >= 60
                ? Math.round(item.playtime_forever / 60) + " hours"
                : item.playtime_forever + " minutes"}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};
