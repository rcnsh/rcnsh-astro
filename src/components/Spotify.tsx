import { SiSpotify } from "react-icons/si";
import { useEffect, useState } from "react";

interface songData {
  isPlaying: boolean;
  title: string;
  artist: string;
  album: string;
  albumImageUrl: string;
  songUrl: string;
}

export default function Spotify() {
  const [song, setSong] = useState<songData>({
    isPlaying: false,
    title: "",
    artist: "",
    album: "",
    albumImageUrl: "",
    songUrl: "",
  });

  useEffect(() => {
    async function getSpotify() {
      try {
        const response = await fetch("https://api.rcn.sh/api/spotify");
        const songPromise = await response.json();

        const newSongData: songData = {
          isPlaying: songPromise.isPlaying,
          title: songPromise.title,
          artist: songPromise.artist,
          album: songPromise.album,
          albumImageUrl: songPromise.albumImageUrl,
          songUrl: songPromise.songUrl,
        };
        setSong((prevSong) => ({ ...prevSong, ...newSongData }));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    getSpotify();
  }, []);

  return (
    <section className={"py-5 text-[#cdc8c2]"}>
      <a
        target="_blank"
        rel="noopener noreferer"
        href={
          song.isPlaying
            ? song.songUrl
            : "https://open.spotify.com/user/nz3i2a30ep85rv5ymcpglhndj"
        }
        className="relative m-auto flex w-72 items-center space-x-4 rounded-md p-5 transition-shadow hover:shadow-md"
      >
        <div className="w-16">
          {song.isPlaying ? (
            <img
              className="w-16 shadow-sm"
              src={song.albumImageUrl}
              alt={song.album}
              width={64}
              height={64}
              loading={"lazy"}
            />
          ) : (
            <SiSpotify size={64} color={"#1ED760"} />
          )}
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
