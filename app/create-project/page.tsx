"use client";

import { useState } from "react";
import api from "../../services/api";

export default function CreateProjectPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [techStack, setTechStack] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const res = await api.post(
        "/projects",
        {
          title,
          description,
          techStack: techStack
            .split(",")
            .map((tech) => tech.trim()),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(res.data.message);

      setTitle("");
      setDescription("");
      setTechStack("");
    } catch (error) {
      console.log(error);
      setMessage("Project creation failed");
    }
  };

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="bg-gray-950 border border-gray-800 rounded-2xl p-8 w-full max-w-xl">
        <h1 className="text-3xl font-bold text-center mb-6">
          Create Project
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            type="text"
            placeholder="Project Title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            className="w-full p-3 rounded-lg bg-black border border-gray-700"
          />

          <textarea
            placeholder="Project Description"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            className="w-full p-3 rounded-lg bg-black border border-gray-700 h-32"
          />

          <input
            type="text"
            placeholder="Tech Stack (React, Node.js, MongoDB)"
            value={techStack}
            onChange={(e) =>
              setTechStack(e.target.value)
            }
            className="w-full p-3 rounded-lg bg-black border border-gray-700"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg"
          >
            Create Project
          </button>
        </form>

        {message && (
          <p className="text-green-400 mt-4 text-center">
            {message}
          </p>
        )}
      </div>
    </main>
  );
}