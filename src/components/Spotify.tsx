
import { SiSpotify } from "react-icons/si";

interface songData {
  isPlaying: boolean;
  title: string;
  artist: string;
  album: string;
  albumImageUrl: string;
  songUrl: string;
}

const song: songData = await fetch("https://api.rcn.sh/api/spotify").then(
  (res) => res.json(),
);

export default function Spotify() {
  return (
    <section className={"py-5 text-[#cdc8c2]"}>
  <a
    target="_blank"
    rel="noopener noreferer"
    href={song.isPlaying
      ? song.songUrl
      : "https://open.spotify.com/user/nz3i2a30ep85rv5ymcpglhndj"}
    className="relative m-auto flex w-72 items-center space-x-4 rounded-md p-5 transition-shadow hover:shadow-md"
  >
    <div className="w-16">
      {
        song.isPlaying ? (
          <img
            className="w-16 shadow-sm"
            src={song.albumImageUrl}
            alt={song.album}
            width={64}
            height={64}
            loading={"eager"}
          />
        ) : (
          <SiSpotify size={64} color={"#1ED760"} />
        )
      }
    </div>
    <div className="flex-1">
      <p className="component font-bold">
        {song.isPlaying ? song.title : "Not Listening"}
      </p>
      <p className="font-dark text-xs">
        {song.isPlaying ? song.artist : "Spotify"}
      </p>
    </div>
    <div className="absolute bottom-1.5 right-1.5">
      <SiSpotify size={20} color={"#1ED760"} />
    </div>
  </a>
</section>
  );
}


