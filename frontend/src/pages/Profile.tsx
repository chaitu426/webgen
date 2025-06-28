/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useEffect, useRef, useState, useId, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useOutsideClick } from "../hooks/use-outside-click";
import { FiExternalLink, FiCopy, FiDownload, FiEdit3 } from "react-icons/fi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
//import axios from "axios";
import Avatar from "boring-avatars";
import setu from "setu.js";

interface Project {
  [x: string]: ReactNode;
  _id: string;
  prompt: string;
  code: string;
  description: string;
  createdAt: string;
}

interface User {
  _id: string;
  username: string;
  email: string;
  createdAt: string;
}

const MAX_DESC_LENGTH = 200;

const Profile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState<Project | null>(null);
  const [showFullDesc, setShowFullDesc] = useState(false);
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useOutsideClick(ref, () => {
    setActive(null);
    setShowFullDesc(false);
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await setu.get(`${import.meta.env.VITE_BASE_URL}/api/user/profile`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(res.data.user);
        setProjects(res.data.projects || []);
      } catch (err) {
        toast.error("Failed to fetch profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActive(null);
        setShowFullDesc(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const copyToClipboard = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      toast.success("Code copied to clipboard!");
    } catch {
      toast.error("Failed to copy code.");
    }
  };

  const downloadCode = (code: string, filename = "project.html") => {
    const blob = new Blob([code], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };


  const openInEditor = (projectId: string) => {
    navigate(`/workspace/${projectId}`);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white px-6 py-30">
      <div className="max-w-4xl mx-auto">
        {user && (




          <motion.div
            layout
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
            whileHover={{ scale: 1.01 }}
            className="mb-10 flex flex-row gap-8 border border-neutral-800 rounded-xl p-4 bg-gradient-to-br from-neutral-900 to-neutral-950 shadow-xl transition-all duration-300"
          >
            <Avatar
              name={user.username}
              colors={["#0a0310", "#49007e", "#ff005b", "#ff7d10", "#ffb238"]}
              variant="beam"
              size={60}
            />
            <div>
              <h2 className="text-3xl font-semibold mb-2">{user.username}</h2>
              <p className="text-neutral-400">{user.email}</p>
              <p className="text-sm text-neutral-600 mt-1">
                Joined on {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>
          </motion.div>


        )}

        <h1 className="text-2xl font-bold mb-4">Your Projects</h1>

        {loading ? (
          <p className="text-gray-400">Loading projects...</p>
        ) : projects.length === 0 ? (
          <p className="text-gray-500">You haven’t created any projects yet.</p>
        ) : (
          <div className="space-y-4">
            {projects.map((project) => (
              <motion.div
                key={project._id}
                layoutId={`card-${project._id}-${id}`}
                onClick={() => {
                  setActive(project);
                  setShowFullDesc(false);
                }}
                className="cursor-pointer border border-neutral-800 rounded-xl p-5 hover:bg-neutral-900 transition shadow-sm"
              >
                <motion.h3
                  layoutId={`title-${project._id}-${id}`}
                  className="text-lg font-semibold text-white line-clamp-1"
                >
                  {project.prompt || "Untitled Prompt"}
                </motion.h3>
                <motion.p
                  layoutId={`desc-${project._id}-${id}`}
                  className="text-sm text-neutral-400 line-clamp-2"
                >
                  {project.description?.slice(0, 100)}...
                </motion.p>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {active && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center px-4 py-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                ref={ref}
                layoutId={`card-${active._id}-${id}`}
                className="w-full max-w-3xl bg-neutral-950 border border-neutral-800 rounded-2xl p-6 relative shadow-2xl"
                initial={{ scale: 0.95 }}
                animate={{
                  scale: 1,
                  transition: { type: "spring", stiffness: 260, damping: 20 },
                }}
                exit={{
                  scale: 0.95,
                  opacity: 0,
                  transition: { duration: 0.2 },
                }}
              >
                <button
                  onClick={() => {
                    setActive(null);
                    setShowFullDesc(false);
                  }}
                  className="absolute top-4 right-4 text-neutral-400 hover:text-white text-xl"
                >
                  &times;
                </button>

                <motion.h2
                  layoutId={`title-${active._id}-${id}`}
                  className="text-2xl font-semibold text-white mb-2"
                >
                  {active.prompt}
                </motion.h2>

                <motion.div
                  layoutId={`desc-${active._id}-${id}`}
                  className="text-neutral-400 mb-1 text-sm whitespace-pre-wrap max-h-40 overflow-y-auto pr-2"
                >
                  {active.description.length > MAX_DESC_LENGTH ? (
                    <>
                      {showFullDesc
                        ? active.description
                        : active.description.slice(0, MAX_DESC_LENGTH) + "..."}


                    </>
                  ) : (
                    active.description
                  )}
                </motion.div>
                <p className="text-neutral-500 text-sm flex flex-col">
                  <span className="text-neutral-500 text-sm mt-2 mb-1">Created on: {new Date(active.createdAt).toLocaleDateString()}</span>
                  <span className="text-neutral-500 text-sm mb-1">Version: {active.version}</span>

                </p>


                <div className="h-64 w-full bg-black border border-neutral-800 mb-4 rounded-lg overflow-hidden">
                  <iframe
                    srcDoc={active.code}
                    title="Live Preview"
                    sandbox="allow-scripts allow-same-origin"
                    className="w-full h-full rounded-lg"
                  ></iframe>
                </div>

                <div className="flex flex-wrap gap-3">
                  <ActionButton
                    icon={<FiExternalLink />}
                    text="Open"
                    onClick={() =>
                      window.open(
                        URL.createObjectURL(new Blob([active.code], { type: 'text/html' })),
                        '_blank'
                      )
                    }
                  />
                  <ActionButton icon={<FiCopy />} text="Copy" onClick={() => copyToClipboard(active.code)} />
                  <ActionButton
                    icon={<FiDownload />}
                    text="Download"
                    onClick={() => downloadCode(active.code, `${active.prompt?.slice(0, 10) || 'project'}.html`)}
                  />
                  <ActionButton icon={<FiEdit3 />} text="Editor" onClick={() => openInEditor(active._id)} />
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

const ActionButton = ({
  icon,
  text,
  onClick,
}: {
  icon: React.ReactNode;
  text: string;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className="flex items-center gap-2 px-4 py-2 bg-neutral-900 hover:bg-neutral-800 hover:text-white rounded-full border border-neutral-700 text-sm transition"
  >
    {icon} {text}
  </button>
);

export default Profile;
