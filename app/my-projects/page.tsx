"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import api from "../../services/api";

export default function MyProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await api.get("/projects");

      const user = JSON.parse(
        localStorage.getItem("user") || "{}"
      );

      const myProjects = res.data.filter((project: any) => {
        const isOwner =
          project.createdBy?._id === user._id;

        const isMember =
          project.teamMembers?.includes(user._id);

        return isOwner || isMember;
      });

      setProjects(myProjects);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl font-bold text-center mb-10">
        My Projects
      </h1>

      {projects.length === 0 ? (
        <div className="text-center text-gray-400">
          You are not part of any project yet.
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project) => {
            const user = JSON.parse(
              localStorage.getItem("user") || "{}"
            );

            const isOwner =
              project.createdBy?._id === user._id;

            return (
              <Link
                key={project._id}
                href={`/project-details/${project._id}`}
              >
                <div className="bg-gray-950 border border-gray-800 rounded-xl p-6 hover:border-blue-500 hover:scale-[1.02] transition cursor-pointer">
                  <h2 className="text-2xl font-bold mb-3">
                    {project.title}
                  </h2>

                  <p className="mb-4">
                    {project.description}
                  </p>

                  <p className="mb-3">
                    <strong>Tech Stack:</strong>{" "}
                    {project.techStack?.join(", ")}
                  </p>

                  <p className="mb-3">
                    <strong>Posted By:</strong>{" "}
                    {project.createdBy?.name}
                  </p>

                  <p className="mb-4">
                    <strong>Email:</strong>{" "}
                    {project.createdBy?.email}
                  </p>

                  <div className="flex gap-3 items-center flex-wrap">
                    <span
                      className={`px-3 py-1 rounded-lg text-sm ${
                        isOwner
                          ? "bg-green-700"
                          : "bg-blue-700"
                      }`}
                    >
                      {isOwner
                        ? "Project Owner"
                        : "Team Member"}
                    </span>

                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        window.location.href = `/chat/${project._id}`;
                      }}
                      className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
                    >
                      Open Chat
                    </button>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </main>
  );
}