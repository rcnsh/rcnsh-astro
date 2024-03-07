import { useState } from "react";
import useKonami from "react-use-konami";
import { motion, AnimatePresence } from "framer-motion";
import Ip from "./Ip";

export default function Joke() {
  const [currentJoke, setCurrentJoke] = useState("");

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
  useKonami(
    () => {
      setCurrentJoke("why");
    },
    { code: ["e", "m", "i", "l", "i", "j", "a"] },
  );

  useKonami(
    () => {
      setCurrentJoke("");
    },
    { code: ["Backspace"] },
  );
  useKonami(
    () => {
      setCurrentJoke("coldrain");
    },
    { code: ["n", "i", "e", "r"] },
  );
  useKonami(
    () => {
      setCurrentJoke("veli");
    },
    { code: ["v", "e", "l", "i"] },
  );
  useKonami(
    () => {
      window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
    },
    { code: ["a", "l", "a", "s", "t", "a", "i", "r"] },
  );
  useKonami(
    () => {
      window.location.href = "http://lol.zip/";
    },
    { code: ["r", "o", "n", "n", "i", "e"] },
  );
  useKonami(
    () => {
      window.location.href = "https://medal.tv/clips/1Xh4BKUK-4CTho/vp6N01F6h";
    },
    { code: ["e", "t", "h", "a", "n"] },
  );
  useKonami(
    () => {
      window.location.href = "https://thomashawkins.vercel.app/";
    },
    { code: ["t", "h", "o", "m", "a", "s"] },
  );

  return (
    <div>
      <AnimatePresence>
        {window.screen.width < 768 && currentJoke === "" && (
          <button
            onClick={() => {
              setCurrentJoke("ip");
              const music = new Audio(
                "https://res.cloudinary.com/dtqhs8nvm/video/upload/f_auto:video,q_auto/llfgyzbqkcckn4ur5wrv",
              );
              music.volume = 0.1;
              music.loop = true;
              music.play();
            }}
          >
            Press me :)
          </button>
        )}
        {currentJoke === "ip" && <Ip />}
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
