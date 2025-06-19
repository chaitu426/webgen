import { cn } from "../../lib/utils";
import { TextHoverEffect } from "./ui/footerEffect";

export function CTA() {
  return (
    <div className="relative flex h-[50rem] w-full items-center justify-center bg-white dark:bg-neutral-950">
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:20px_20px]",
          "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
          "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]",
        )}
      />
      {/* Radial gradient for the container to give a faded look */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-neutral-950"></div>
      <p className="relative z-20 bg-gradient-to-b from-neutral-200 to-neutral-500 bg-clip-text py-1 text-4xl font-bold text-transparent sm:text-6xl">
        <h2 className="text-center font-jetbrains text-white">
        Start building with
        </h2>
      <div className="h-[30rem] z-50 flex items-center justify-center">
      <TextHoverEffect text="WEBGEN" />
      </div>
      </p>
    </div>
  );
}
