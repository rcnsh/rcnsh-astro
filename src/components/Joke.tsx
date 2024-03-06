import { useEffect, useState } from "react";

export default function Joke() {
  const [ip, setIp] = useState(".......");

  useEffect(() => {
    async function fetchIp() {
      setIp(
        await fetch("/ip.json")
          .then((res) => res.json())
          .then((data) => data.clientAddress),
      );
    }

    fetchIp();
  });

  return (
    <div>
      <span className="w-[40%]">
        {" "}
        Nice argument, however <b>{ip}</b>
      </span>
    </div>
  );
}
