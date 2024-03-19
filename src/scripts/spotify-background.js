import Vibrant from "node-vibrant";

function backgroundColour() {
  const image = document.getElementById("spotify-image");
  if (image) {
    Vibrant.from(image.src)
      .getPalette()
      .then((palette) => {
        const vibrantColour = palette.Vibrant.hex;
        const mutedColour = palette.Muted.hex;
        const darkMutedColour = palette.DarkMuted.hex;

        const element = document.getElementById("spotify-background");
        element.style.background = `linear-gradient(-45deg, ${vibrantColour}, ${mutedColour}, ${darkMutedColour}`;
        element.style.boxShadow = `0 0 15px 10px ${darkMutedColour}`;
      });
  }
}
document.addEventListener("astro:after-swap", backgroundColour);

document.addEventListener("DOMContentLoaded", backgroundColour);