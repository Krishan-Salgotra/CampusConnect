"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "../../../services/api";

export default function EditProjectPage() {
  const router = useRouter();
  const params = useParams();

  const projectId = params?.id as string;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [techStack, setTechStack] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!projectId) return;

    fetchProject();
  }, [projectId]);

  const fetchProject = async () => {
    try {
      const res = await api.get(
        `/projects/${projectId}`
      );

      setTitle(res.data.title);
      setDescription(res.data.description);

      setTechStack(
        res.data.techStack?.join(", ") || ""
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const updateProject = async () => {
    try {
      setSaving(true);

      const token =
        localStorage.getItem("token");

      await api.put(
        `/projects/${projectId}`,
        {
          title,
          description,
          techStack: techStack
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Project updated successfully");

      router.push(
        `/project-details/${projectId}`
      );
    } catch (error) {
      console.log(error);
      alert("Failed to update project");
    } finally {
      setSaving(false);
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
      <div className="max-w-3xl mx-auto bg-gray-950 border border-gray-800 rounded-2xl p-8">

        <h1 className="text-4xl font-bold mb-8">
          Edit Project
        </h1>

        <div className="space-y-5">

          <div>
            <label className="block mb-2">
              Project Title
            </label>

            <input
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-2">
              Description
            </label>

            <textarea
              rows={5}
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-2">
              Tech Stack
            </label>

            <input
              value={techStack}
              onChange={(e) =>
                setTechStack(e.target.value)
              }
              placeholder="React, Node.js, MongoDB"
              className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3"
            />
          </div>

          <div className="flex gap-4 pt-4">

            <button
              onClick={updateProject}
              disabled={saving}
              className="bg-yellow-600 hover:bg-yellow-700 px-6 py-3 rounded-lg"
            >
              {saving
                ? "Saving..."
                : "Save Changes"}
            </button>

            <button
              onClick={() =>
                router.back()
              }
              className="bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-lg"
            >
              Cancel
            </button>

          </div>

        </div>

      </div>
    </main>
  );
}