"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "../../../services/api";

export default function ProjectDetailsPage() {
  const router = useRouter();
  const params = useParams();

  const projectID = params?.projectID as string;

  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!projectID) return;

    fetchProject();
  }, [projectID]);

  const fetchProject = async () => {
    try {
      const res = await api.get(
        `/projects/${projectID}`
      );

      setProject(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const removeMember = async (
    memberId: string
  ) => {
    const confirmed = window.confirm(
      "Remove this member from project?"
    );

    if (!confirmed) return;

    try {
      const token =
        localStorage.getItem("token");

      const res = await api.delete(
        `/projects/${project._id}/member/${memberId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProject(res.data);

      alert("Member removed");
    } catch (error) {
      console.log(error);
      alert("Failed to remove member");
    }
  };

  const leaveProject = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to leave this project?"
    );

    if (!confirmed) return;

    try {
      const token =
        localStorage.getItem("token");

      await api.post(
        `/projects/${project._id}/leave`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("You left the project");

      router.push("/my-projects");
    } catch (error) {
      console.log(error);
      alert("Failed to leave project");
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Delete this project permanently?"
    );

    if (!confirmed) return;

    try {
      const token =
        localStorage.getItem("token");

      await api.delete(
        `/projects/${project._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Project deleted");

      router.push("/my-projects");
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading...
      </main>
    );
  }

  if (!project) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        Project not found
      </main>
    );
  }

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const isOwner =
    project.createdBy?._id === user._id;

  const isMember =
    project.teamMembers?.some(
      (member: any) =>
        member._id === user._id
    );

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <div className="max-w-5xl mx-auto bg-gray-950 border border-gray-800 rounded-2xl p-8">

        <h1 className="text-5xl font-bold mb-4">
          {project.title}
        </h1>

        <p className="text-gray-300 mb-8">
          {project.description}
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-10">

          <div className="bg-gray-900 p-6 rounded-xl">
            <h2 className="text-2xl font-bold mb-4">
              Project Info
            </h2>

            <p>
              <strong>Tech Stack:</strong>{" "}
              {project.techStack?.join(", ")}
            </p>

            <p className="mt-3">
              <strong>Total Members:</strong>{" "}
              {(project.teamMembers?.length || 0) + 1}
            </p>
          </div>

          <div className="bg-gray-900 p-6 rounded-xl">
            <h2 className="text-2xl font-bold mb-4">
              Project Owner
            </h2>

            <p>{project.createdBy?.name}</p>

            <p className="text-gray-400">
              {project.createdBy?.email}
            </p>

            <span className="inline-block mt-3 bg-green-700 px-3 py-1 rounded-lg">
              Owner
            </span>
          </div>

        </div>

        <h2 className="text-3xl font-bold mb-5">
          Team Members
        </h2>

        {project.teamMembers?.length > 0 ? (
          <div className="space-y-4 mb-10">

            {project.teamMembers.map(
              (member: any) => (
                <div
                  key={member._id}
                  className="bg-gray-900 p-5 rounded-xl flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-bold">
                      {member.name}
                    </h3>

                    <p className="text-gray-400">
                      {member.email}
                    </p>
                  </div>

                  {isOwner && (
                    <button
                      onClick={() =>
                        removeMember(
                          member._id
                        )
                      }
                      className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
                    >
                      Remove
                    </button>
                  )}
                </div>
              )
            )}

          </div>
        ) : (
          <p className="text-gray-400 mb-10">
            No team members yet.
          </p>
        )}

        <div className="flex gap-4 flex-wrap">

          <button
            onClick={() =>
              router.push(
                `/chat/${project._id}`
              )
            }
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg"
          >
            Open Project Chat
          </button>

          {isOwner && (
            <>
              <button
                onClick={() =>
                  router.push(
                    `/edit-project/${project._id}`
                  )
                }
                className="bg-yellow-600 hover:bg-yellow-700 px-6 py-3 rounded-lg"
              >
                Edit Project
              </button>

              <button
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg"
              >
                Delete Project
              </button>
            </>
          )}

          {!isOwner && isMember && (
            <button
              onClick={leaveProject}
              className="bg-orange-600 hover:bg-orange-700 px-6 py-3 rounded-lg"
            >
              Leave Project
            </button>
          )}

          <button
            onClick={() =>
              router.push("/my-projects")
            }
            className="bg-gray-600 hover:bg-gray-700 px-6 py-3 rounded-lg"
          >
            Back
          </button>

        </div>

      </div>
    </main>
  );
}