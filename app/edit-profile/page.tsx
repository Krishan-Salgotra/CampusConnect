"use client";

import { useEffect, useState } from "react";
import api from "../../services/api";

export default function EditProfilePage() {
  const [branch, setBranch] = useState("");
  const [year, setYear] = useState("");
  const [skills, setSkills] = useState("");
  const [bio, setBio] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await api.get("/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setBranch(res.data.branch || "");
        setYear(res.data.year || "");
        setSkills(
          res.data.skills ? res.data.skills.join(", ") : ""
        );
        setBio(res.data.bio || "");
      } catch (error) {
        console.log(error);
      }
    };

    fetchProfile();
  }, []);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const res = await api.put(
        "/profile",
        {
          branch,
          year,
          skills: skills
            .split(",")
            .map((skill) => skill.trim()),
          bio,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(res.data.message);
    } catch (error) {
      console.log(error);
      setMessage("Update Failed");
    }
  };

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="bg-gray-950 border border-gray-800 rounded-2xl p-8 w-full max-w-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Edit Profile
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            type="text"
            placeholder="Branch"
            value={branch}
            onChange={(e) =>
              setBranch(e.target.value)
            }
            className="w-full p-3 rounded-lg bg-black border border-gray-700"
          />

          <input
            type="text"
            placeholder="Year"
            value={year}
            onChange={(e) =>
              setYear(e.target.value)
            }
            className="w-full p-3 rounded-lg bg-black border border-gray-700"
          />

          <input
            type="text"
            placeholder="Skills (comma separated)"
            value={skills}
            onChange={(e) =>
              setSkills(e.target.value)
            }
            className="w-full p-3 rounded-lg bg-black border border-gray-700"
          />

          <textarea
            placeholder="Bio"
            value={bio}
            onChange={(e) =>
              setBio(e.target.value)
            }
            className="w-full p-3 rounded-lg bg-black border border-gray-700 h-28"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg"
          >
            Save Profile
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