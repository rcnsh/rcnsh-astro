import FadeIn from "./FadeIn";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Ip() {
  const [ip, setIp] = useState("192.168.1.1");
  const [ipStage, setIpStage] = useState(0);
  const ipmusic = new Audio(
    "https://res.cloudinary.com/dtqhs8nvm/video/upload/f_auto:video,q_auto/omxdiolty5wvzq4ocedh",
  );
  ipmusic.volume = 0.1;
  ipmusic.loop = true;
  useEffect(() => {
    async function fetchIp() {
      setIp(
        await fetch("/ip.json")
          .then((res) => res.json())
          .then((data) => data.clientAddress),
      );
    }

    ipmusic.play();

    fetchIp();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIpStage((prev) => (prev + 1) % 20);
    }, 950);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    return () => {
      ipmusic.pause();
    };
  }, []);

  return (
    <span className="w-[40%]">
      Nice argument, however{" "}
      {ipStage >= 0 && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          unfortunately
        </motion.span>
      )}
      <br />
      {ipStage === 1 && <FadeIn>IP: {ip}</FadeIn>}
      {ipStage === 2 && <FadeIn>N: 51.797151</FadeIn>}
      {ipStage === 3 && <FadeIn>W: -0.0806808</FadeIn>}
      {ipStage === 4 && (
        <FadeIn>IPv6: fe80::5dcsd::ef69::fb22::d9888%12</FadeIn>
      )}
      {ipStage === 5 && <FadeIn>MAC: 00:0a:95:9d:68:16</FadeIn>}
      {ipStage === 6 && <FadeIn>UPNP: Enabled</FadeIn>}
      {ipStage === 7 && <FadeIn>DMZ: 10.112.42.15</FadeIn>}
      {ipStage === 8 && <FadeIn>MAC: 5A:78:3E:7E:00</FadeIn>}
      {ipStage === 9 && <FadeIn>ISP: EE</FadeIn>}
      {ipStage === 10 && <FadeIn>DNS: 8.8.8.8</FadeIn>}
      {ipStage === 11 && <FadeIn>ALT DNS: 1.1.1.8.1</FadeIn>}
      {ipStage === 12 && <FadeIn>DNS SUFFIX: Dlink</FadeIn>}
      {ipStage === 13 && <FadeIn>WAN: 100.23.10.15</FadeIn>}
      {ipStage === 14 && <FadeIn>WAN TYPE: Private Nat</FadeIn>}
      {ipStage === 15 && <FadeIn>GATEWAY: 192.168.0.1</FadeIn>}
      {ipStage === 16 && <FadeIn>SUBNET MASK: 255.255.0.255</FadeIn>}
      {ipStage === 17 && <FadeIn>UDP OPEN PORTS: 8080. 80</FadeIn>}
      {ipStage === 18 && <FadeIn>TCP OPEN PORTS: 443</FadeIn>}
      {ipStage === 19 && <FadeIn>ROUTER VENDOR: NETGEAR</FadeIn>}
    </span>
  );
}
