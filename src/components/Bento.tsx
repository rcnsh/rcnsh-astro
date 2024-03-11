import { cn } from "../lib/utils";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid auto-rows-[18rem] grid-cols-4 gap-4 mx-auto ",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  link,
}: {
  className?: string;
  title: string;
  description?: string | React.ReactNode;
  header: string;
  icon?: React.ReactNode;
  link: string;
}) => {
  return (
      <a
        className={cn(
          "row-span-1 rounded-xl hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-white border border-transparent justify-between flex flex-col space-y-4 hover:translate-x-2",
          className,
        )}
        href={link}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div
          className="h-full w-full bg-cover bg-center rounded-lg"
          style={{ backgroundImage: `url(${header})` }}
        ></div>
        <div className="bg-gradient-to-br from-neutral-900 to-neutral-700 p-3 rounded-lg mt-auto">
          {icon}
          <div className="font-sans font-bold text-neutral-600 dark:text-neutral-200 mb-2 mt-2">
            {title}
          </div>
          <div className="font-sans font-normal text-neutral-600 text-xs dark:text-neutral-300">
            {description}
          </div>
        </div>
      </a>
  );
};
