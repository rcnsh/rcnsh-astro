import Joke from "./Joke";

export default function Footer({ children }: { children: React.ReactNode }) {
  return (
    <footer>
      <hr className="bg-[#c5c0b8] h-[1px] w-full" />
      <div className="mt-4">
        <div className="flex flex-row text-[#c5c0b8] font-mono text-center justify-between text-sm lg:text-lg lg:px-12">
          <span className="w-[20%]"> rcn.sh © {new Date().getFullYear()} </span>
          <Joke />
          {children}
        </div>
      </div>
    </footer>
  );
}
