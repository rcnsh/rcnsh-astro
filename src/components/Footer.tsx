export default function Footer({ children }: { children: React.ReactNode }) {
  return (
    <footer className="p-4">
      <hr className="bg-[#c5c0b8] h-[1px] w-full" />
      <div className="mt-4">
        <p className="flex flex-row justify-evenly text-[#c5c0b8] font-mono">
          <span> rcn.sh © 2024 </span>
          {children}
        </p>
      </div>
    </footer>
  );
}