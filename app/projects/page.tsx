"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import api from "../../services/api";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [filteredProjects, setFilteredProjects] =
    useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    const filtered = projects.filter(
      (project) =>
        project.title
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        project.description
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        project.createdBy?.name
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        project.techStack
          ?.join(" ")
          .toLowerCase()
          .includes(search.toLowerCase())
    );

    setFilteredProjects(filtered);
  }, [search, projects]);

  const fetchProjects = async () => {
    try {
      const res = await api.get("/projects");

      setProjects(res.data);
      setFilteredProjects(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const joinProject = async (
    e: React.MouseEvent,
    projectId: string
  ) => {
    e.preventDefault();

    try {
      const token =
        localStorage.getItem("token");

      const res = await api.post(
        "/requests",
        { projectId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(res.data.message);
    } catch (error: any) {
      setMessage(
        error?.response?.data?.message ||
          "Failed to send request"
      );
    }
  };

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-5xl font-bold text-center mb-8">
        Browse Projects
      </h1>

      <div className="max-w-4xl mx-auto mb-8">
        <input
          type="text"
          placeholder="Search by title, tech stack, owner..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full bg-gray-900 border border-gray-700 rounded-xl p-4"
        />
      </div>

      {message && (
        <div className="max-w-3xl mx-auto mb-6 bg-green-900 border border-green-500 text-green-200 p-3 rounded-lg text-center">
          {message}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {filteredProjects.map((project) => (
          <Link
            key={project._id}
            href={`/project-details/${project._id}`}
          >
            <div className="bg-gray-950 border border-gray-800 rounded-xl p-6 hover:border-blue-500 transition cursor-pointer">

              <h2 className="text-2xl font-bold mb-3">
                {project.title}
              </h2>

              <p className="mb-4">
                {project.description}
              </p>

              <p>
                <strong>Tech Stack:</strong>{" "}
                {project.techStack?.join(", ")}
              </p>

              <p className="mt-3">
                <strong>Posted By:</strong>{" "}
                {project.createdBy?.name}
              </p>

              <button
                onClick={(e) =>
                  joinProject(
                    e,
                    project._id
                  )
                }
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg mt-4"
              >
                Join Project
              </button>

            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}