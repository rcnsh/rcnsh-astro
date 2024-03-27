import Vibrant from "node-vibrant";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function backgroundColour() {
  const image = document.getElementById("spotify-image") as HTMLImageElement;
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
}
