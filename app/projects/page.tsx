"use client";

import { useEffect, useState } from "react";
import api from "../../services/api";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await api.get("/projects");
      setProjects(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const joinProject = async (projectId: string) => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.post(
        "/requests",
        {
          projectId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(res.data.message);

      fetchProjects();
    } catch (error: any) {
      setMessage(
        error?.response?.data?.message ||
          "Failed to send request"
      );
    }
  };

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl font-bold text-center mb-10">
        Campus Projects
      </h1>

      {message && (
        <div className="max-w-3xl mx-auto mb-6 bg-green-900 border border-green-500 text-green-200 p-3 rounded-lg text-center">
          {message}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div
            key={project._id}
            className="bg-gray-950 border border-gray-800 rounded-xl p-6"
          >
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

            <p>
              <strong>Email:</strong>{" "}
              {project.createdBy?.email}
            </p>

            <div className="mt-4">
              <strong>Team Members:</strong>

              {project.teamMembers &&
              project.teamMembers.length > 0 ? (
                <ul className="mt-2 list-disc list-inside">
                  {project.teamMembers.map(
                    (member: any) => (
                      <li key={member._id}>
                        {member.name} (
                        {member.email})
                      </li>
                    )
                  )}
                </ul>
              ) : (
                <p className="text-gray-400 mt-1">
                  No team members yet
                </p>
              )}
            </div>

            <button
              onClick={() =>
                joinProject(project._id)
              }
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg mt-4"
            >
              Join Project
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}