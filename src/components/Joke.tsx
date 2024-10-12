import { useState } from "react";
import useKonami from "react-use-konami";
import { motion, AnimatePresence } from "framer-motion";
import Ip from "./Ip";
import getRCN from "@pages/api/rcn.ts";

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
      setCurrentJoke("sonja");
    },
    { code: ["s", "o", "n", "j", "a"] },
  )
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
      setCurrentJoke("nier");
    },
    { code: ["n", "i", "e", "r"] },
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

  const rcn = getRCN();

  return (
    <div>
      <AnimatePresence>
        {window.screen.width < 768 && currentJoke === "" && (
          <button
            onClick={() => {
              setCurrentJoke("ip");
            }}
          >
            Press me :D
          </button>
        )}
        {currentJoke === "ip" && <Ip />}
        {currentJoke === "rcn" && (
          <motion.span
            className="flex flex-col"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
          >
            {rcn}
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
        {currentJoke === "nier" && (
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
        {
          currentJoke === "sonja" && (
            <motion.span
              className="w-[40%] flex flex-col"
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2, ease: "easeOut", delay: 1 }}
            >
              <img
                src="https://res.cloudinary.com/dtqhs8nvm/image/upload/f_auto,q_auto/m9oakj9po66akhfnqp6e"
                alt="Sonja"
                width={128}
                height={128}
                loading="eager"
              />
              <b>Sonja</b>
            </motion.span>
          )
        }
      </AnimatePresence>
    </div>
  );
}
