import useKonami from "react-use-konami";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Konami() {
  const [show, setShow] = useState(false);

  useKonami(() => {
    setShow(!show);
  });

  return (
    <div>
      {show && (
        <div>
          <motion.img
            src="https://res.cloudinary.com/dtqhs8nvm/image/upload/v1709586709/miku2.jpg"
            alt="Konami"
            style={{
              width: "3%",
              position: "absolute",
              top: "100%",
              left: "97%",
              transform: "translate(-50%, -50%)",
            }}
            initial={{ opacity: 0, y: "100vh" }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
      )}
    </div>
  );
}
