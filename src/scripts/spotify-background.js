import Vibrant from "node-vibrant";

function backgroundColour() {
  const image = document.getElementById("spotify-image");
  if (image) {
    Vibrant.from(image.src)
      .getPalette()
      .then((palette) => {
        const vibrantColor = palette.Vibrant.hex;
        const mutedColor = palette.Muted.hex;
        const darkMutedColor = palette.DarkMuted.hex;

        const element = document.getElementById("spotify-background");
        element.style.background = `linear-gradient(to bottom right, ${vibrantColor}, ${mutedColor}, ${darkMutedColor})`;
      });
  }
}
document.addEventListener("astro:after-swap", backgroundColour);

document.addEventListener("DOMContentLoaded", backgroundColour);
