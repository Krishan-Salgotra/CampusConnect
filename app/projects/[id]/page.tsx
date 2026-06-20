"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "../../../services/api";

export default function ProjectDetailsPage() {
  const params = useParams();

  const [project, setProject] =
    useState<any>(null);

  useEffect(() => {
    fetchProject();
  }, []);

  const fetchProject = async () => {
    try {
      const res =
        await api.get("/projects");

      const foundProject =
        res.data.find(
          (p: any) =>
            p._id === params.id
        );

      setProject(foundProject);
    } catch (error) {
      console.log(error);
    }
  };

  if (!project) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <div className="max-w-4xl mx-auto bg-gray-900 border border-gray-800 rounded-2xl p-8">

        <h1 className="text-5xl font-bold mb-6">
          {project.title}
        </h1>

        <div className="bg-gray-950 p-5 rounded-xl mb-5">
          <h2 className="text-xl font-bold mb-3">
            Description
          </h2>

          <p>
            {project.description}
          </p>
        </div>

        <div className="bg-gray-950 p-5 rounded-xl mb-5">
          <h2 className="text-xl font-bold mb-3">
            Required Skills
          </h2>

          <div className="flex flex-wrap gap-3">
            {project.skills?.map(
              (
                skill: string,
                index: number
              ) => (
                <span
                  key={index}
                  className="bg-blue-600 px-4 py-2 rounded-lg"
                >
                  {skill}
                </span>
              )
            )}
          </div>
        </div>

        <div className="bg-gray-950 p-5 rounded-xl">
          <h2 className="text-xl font-bold mb-3">
            Project Owner
          </h2>

          <p>
            {project.ownerId?.name}
          </p>
        </div>

      </div>
    </main>
  );
}