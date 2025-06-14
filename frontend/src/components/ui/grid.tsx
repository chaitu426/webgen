import { cn } from "../../../lib/utils";

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
        "mx-auto grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 auto-rows-[20rem] px-4",
        className
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
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "group/bento relative flex flex-col justify-between overflow-hidden rounded-2xl border border-neutral-200 bg-white/90 p-5 shadow-md transition-all duration-300 hover:shadow-xl dark:border-white/[0.1] dark:bg-white/[0.05] dark:shadow-none",
        "hover:scale-[1.015] hover:border-neutral-300 dark:hover:border-white/20 backdrop-blur-sm",
        className
      )}
    >
      {/* Image or header section */}
      <div className="rounded-lg overflow-hidden">{header}</div>

      {/* Icon + Text Section */}
      <div className="mt-4 transition-all duration-200 group-hover/bento:translate-x-1">
        <div className="mb-2 flex items-center gap-2 text-neutral-600 dark:text-neutral-300">
          {icon}
          <h3 className="font-semibold text-base md:text-lg">{title}</h3>
        </div>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          {description}
        </p>
      </div>
    </div>
  );
};
