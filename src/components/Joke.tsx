import { useEffect, useState } from "react";
import useKonami from "react-use-konami";

export default function Joke() {
  const [ip, setIp] = useState(".......");
  const [currentJoke, setCurrentJoke] = useState("");

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
      setCurrentJoke("ip");
    },
    { code: ["i", "p"] },
  );
  useKonami(
    () => {
      setCurrentJoke("rcn");
    },
    { code: ["r", "c", "n"] },
  );

  return (
    <div>
      {currentJoke === "ip" && (
        <span className="w-[40%]">
          Nice argument, however <b>{ip}</b>
        </span>
      )}
      {currentJoke === "rcn" && (
        <span className="w-[40%]">
          <svg
            className="w-[50%] md:w-[30%] lg:w-[25%] xl:w-[15%] mx-auto justify-center"
            xmlns="http://www.w3.org/2000/svg"
            id="Layer_1"
            data-name="Layer 1"
            viewBox="100 350 900 450"
          >
            <g>
              <polygon
                points="947.67 500.78 902.38 579.22 857.08 657.67 766.48 657.67 811.77 579.22 857.07 500.78 766.48 500.78 721.19 579.22 675.88 657.67 585.3 657.67 630.59 579.22 539.99 579.22 585.28 500.78 675.88 500.78 675.88 500.76 721.17 422.31 902.38 422.31 902.38 422.33 947.67 500.78"
                className="fill-[#5b66af] stroke-none"
              ></polygon>
              <polygon
                points="494.7 500.78 449.41 579.22 494.7 657.67 494.7 657.69 404.1 657.69 404.1 657.67 358.81 579.22 404.1 500.78 313.52 500.78 268.23 579.22 222.92 657.69 132.33 657.69 177.62 579.24 177.64 579.22 222.93 500.78 268.23 422.33 268.23 422.31 539.99 422.31 494.7 500.78"
                className="fill-[#305b99] stroke-none"
              ></polygon>
            </g>
          </svg>
        </span>
      )}
    </div>
  );
}
