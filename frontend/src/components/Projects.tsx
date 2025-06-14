
import { BentoGrid, BentoGridItem } from "../components/ui/grid";
import {
  IconArrowWaveRightUp,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";
import Project1 from "../assets/Screenshot from 2025-06-11 11-42-08.png";
import Project2 from "../assets/Screenshot from 2025-06-11 12-08-26.png";
import Project3 from "../assets/Screenshot from 2025-06-11 12-32-38.png";
import Project4 from "../assets/Screenshot from 2025-06-11 14-42-49.png";
import Project5 from "../assets/Screenshot from 2025-06-11 15-14-03.png";



export function Projects() {
  return (
    <>
    <div className="max-w-5xl mx-auto mt-20 text-center">
        <h1 className="text-3xl md:text-5xl font-semibold font-jetbrains text-white tracking-tight mb-4">
        Built by Visionaries
        </h1>
        <p className="text-sm md:text-base text-neutral-500 dark:text-neutral-400 max-w-xl mx-auto">
        Explore real, impactful work
        </p>
      </div>
    <BentoGrid className="max-w-6xl mx-auto mt-14">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={<ImageCard img={item.img} />}
          icon={item.icon}
          className={i === 3 || i === 6 ? "md:col-span-2" : ""}
        />
      ))}
    </BentoGrid>
    </>
  );
}

const ImageCard = ({ img }: { img: string }) => (
  <div className="w-full h-48 overflow-hidden rounded-xl shadow-md">
    <img
      src={img}
      alt="project cover"
      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
    />
  </div>
);

const items = [
    {
      title: "CodeOrbital Editor",
      description: "Multi-language online code editor with live preview.",
      img: Project1,
      icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: "AI SaaS Generator",
      description: "Full-stack site builder powered by AI prompts.",
      img: Project2,
      icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: "Framer-Like Landing",
      description: "Animated modern homepage with Tailwind & GSAP.",
      img: Project3,
      icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: "Dev Portfolio",
      description: "Next.js & Tailwind portfolio with blog & projects.",
      img: Project4,
      icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: "Docs UI Clone",
      description: "Minimal docs with instant search and sidebar.",
      img: Project5,
      icon: <IconArrowWaveRightUp className="h-4 w-4 text-neutral-500" />,
    },
  ];
  