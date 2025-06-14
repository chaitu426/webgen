import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import {Link} from "react-router-dom";

export default function TopNavbar() {
    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        { label: "Features", href: "#features" },
        { label: "Pricing", href: "#pricing" },
        { label: "Contact", href: "#contact" },
    ];

    return (

        <nav className="fixed top-6 left-1/2 z-50 w-[90%] max-w-7xl -translate-x-1/2 rounded-2xl border border-neutral-200 bg-white/80 shadow-xl backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-950"
        >
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
                {/* Logo */}
                <Link to="/">
                <div className="flex items-center gap-2">
                    <img src="https://assets.aceternity.com/logo-dark.png" alt="Logo" className="h-8 w-8" />
                    <span className="font-semibold text-lg text-black dark:text-white font-jetbrains">WebGen</span>
                </div>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-6">
                    {navItems.map((item, idx) => (
                        <a
                            key={idx}
                            href={item.href}
                            className="text-sm text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white transition"
                        >
                            {item.label}
                        </a>
                    ))}
                    <Link
                       to="/signup"
                    >
                    <button className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6  text-white inline-block">
                        <span className="absolute inset-0 overflow-hidden rounded-full">
                            <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                        </span>
                        <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10 ">
                            <span>
                                Get Started
                            </span>
                            <svg
                                fill="none"
                                height="16"
                                viewBox="0 0 24 24"
                                width="16"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M10.75 8.75L14.25 12L10.75 15.25"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1.5"
                                />
                            </svg>
                        </div>
                        <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
                    </button>
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <div className="md:hidden">
                    <button onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Nav Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        className="md:hidden px-4 pb-4 overflow-hidden"
                    >
                        <div className="flex flex-col space-y-3">
                            {navItems.map((item, idx) => (
                                <a
                                    key={idx}
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className="text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white text-sm"
                                >
                                    {item.label}
                                </a>
                            ))}
                            <button
                                onClick={() => setIsOpen(false)}
                                className="w-full px-4 py-2 rounded bg-black text-white text-sm font-medium mt-2"
                            >
                                Book a Call
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
