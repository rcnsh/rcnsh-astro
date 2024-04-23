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

export const smartTruncate = (
  string: string,
  length: number,
  {
    mark = "\u2026", // ellipsis = …

    position = length - 1,
  } = {},
) => {
  if (typeof mark !== "string") return string;

  const markOffset = mark.length;

  const minLength = 4;

  let str = string;

  if (typeof str === "string") {
    str = str.trim();
  }

  const invalid =
    typeof str !== "string" ||
    str.length < minLength ||
    typeof length !== "number" ||
    length <= minLength ||
    length >= str.length - markOffset;

  if (invalid) return string;

  if (position >= length - markOffset) {
    const start = str.substring(0, length - markOffset);

    return `${start}${mark}`;
  }

  const start = str.substring(0, position);

  const end = str.slice(position + markOffset - length);

  return `${start}${mark}${end}`;
};
