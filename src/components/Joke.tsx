import { useEffect, useState } from "react";
import useKonami from "react-use-konami";

export default function Joke() {
  const [ip, setIp] = useState(".......");
  const [ipVisible, setIpVisible] = useState(false);

  useEffect(() => {
    async function fetchIp() {
      setIp(
        await fetch("/ip.json")
          .then((res) => res.json())
          .then((data) => data.clientAddress),
      );
    }

    fetchIp();
  }, []);

  useKonami(
    () => {
      setIpVisible(true);
    },
    { code: ["i", "p"] },
  );

  return (
    <div>
      {ipVisible && (
        <span className="w-[40%]">
          Nice argument, however <b>{ip}</b>
        </span>
      )}
    </div>
  );
}
