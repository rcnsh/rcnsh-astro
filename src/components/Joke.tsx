import { useEffect, useState } from "react";
import useKonami from "react-use-konami";
import { motion, AnimatePresence } from "framer-motion";
import FadeIn from "./FadeIn";

export default function Joke() {
  const [ip, setIp] = useState(".......");
  const [currentJoke, setCurrentJoke] = useState("");
  const [ipStage, setIpStage] = useState(0);

  const stopAllAudio = () => {
    document.querySelectorAll('audio').forEach(el => el.pause());
  }

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
      const ipmusic = new Audio("https://res.cloudinary.com/dtqhs8nvm/video/upload/f_auto:video,q_auto/omxdiolty5wvzq4ocedh")
      ipmusic.volume = 0.1;
      ipmusic.play();
    },
    { code: ["i", "p"] },
  );
  useKonami(
    () => {
      setCurrentJoke("rcn");
      stopAllAudio();
    },
    { code: ["r", "c", "n"] },
  );
  useKonami(
    () => {
      setCurrentJoke("why");
      stopAllAudio();
    },
    { code: ["e", "m", "i", "l", "i", "j", "a"] },
  );

  useKonami(
    () => {
      setCurrentJoke("");
      stopAllAudio();
    },
    { code: ["Backspace"] },
  );
  useKonami(
    () => {
      setCurrentJoke("coldrain");
      stopAllAudio();
    },
    { code: ["n", "i", "e", "r"] },
  );
  useKonami(
    () => {
      setCurrentJoke("veli");
      stopAllAudio();
    },
    { code: ["v", "e", "l", "i"] },
  );

  useEffect(() => {
    if (currentJoke === "ip") {
      const interval = setInterval(() => {
        setIpStage((prev) => (prev + 1) % 18);
      }, 950);
      return () => clearInterval(interval);
    }
  }, [currentJoke]);

  return (
    <div>
      <AnimatePresence>
        {currentJoke === "ip" && (
          <span className="w-[40%]">
            Nice argument, however unfortunately
            <br />
            {ipStage === 0 && <FadeIn>IP: {ip}</FadeIn>}
            {ipStage === 1 && <FadeIn>N: 51.797151</FadeIn>}
            {ipStage === 2 && <FadeIn>W: -0.0806808</FadeIn>}
            {ipStage === 3 && (
              <FadeIn>IPv6: fe80::5dcsd::ef69::fb22::d9888%12</FadeIn>
            )}
            {ipStage === 4 && <FadeIn>MAC: 00:0a:95:9d:68:16</FadeIn>}
            {ipStage === 5 && <FadeIn>UPNP: Enabled</FadeIn>}
            {ipStage === 6 && <FadeIn>DMZ: 10.112.42.15</FadeIn>}
            {ipStage === 7 && <FadeIn>MAC: 5A:78:3E:7E:00</FadeIn>}
            {ipStage === 8 && <FadeIn>ISP: EE</FadeIn>}
            {ipStage === 9 && <FadeIn>DNS: 8.8.8.8</FadeIn>}
            {ipStage === 10 && <FadeIn>ALT DNS: 1.1.1.8.1</FadeIn>}
            {ipStage === 11 && <FadeIn>DNS SUFFIX: Dlink</FadeIn>}
            {ipStage === 12 && <FadeIn>WAN: 100.23.10.15</FadeIn>}
            {ipStage === 13 && <FadeIn>WAN TYPE: Private Nat</FadeIn>}
            {ipStage === 14 && <FadeIn>GATEWAY: 192.168.0.1</FadeIn>}
            {ipStage === 15 && <FadeIn>SUBNET MASK: 255.255.0.255</FadeIn>}
            {ipStage === 16 && <FadeIn>UDP OPEN PORTS: 8080. 80</FadeIn>}
            {ipStage === 17 && <FadeIn>TCP OPEN PORTS: 443</FadeIn>}
            {ipStage === 18 && <FadeIn>ROUTER VENDOR: NETGEAR</FadeIn>}
          </span>
        )}
        {currentJoke === "rcn" && (
          <motion.span
            className="w-[40%]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <svg
              className="w-[50%] md:w-[30%] mx-auto justify-center"
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
          </motion.span>
        )}
        {currentJoke === "why" && (
          <motion.span
            className="w-[40%] flex flex-col"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, ease: "easeOut", delay: 1 }}
          >
            <img
              src="https://res.cloudinary.com/dtqhs8nvm/image/upload/v1709586709/miku2.jpg"
              alt="Why?"
              width={128}
              height={128}
              loading="eager"
            />
            <b>Why?</b>
          </motion.span>
        )}
        {currentJoke === "coldrain" && (
          <motion.span
            className="w-[40%]"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <audio
              controls
              src="https://res.cloudinary.com/dtqhs8nvm/video/upload/f_auto:video,q_auto/coldrain"
            />
          </motion.span>
        )}
        {currentJoke === "veli" && (
          <motion.span
            className="w-[40%]"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <img
              src="https://res.cloudinary.com/dtqhs8nvm/image/upload/f_auto,q_auto/veli"
              alt="Veli"
              width={128}
              height={128}
              loading="eager"
            />
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}
