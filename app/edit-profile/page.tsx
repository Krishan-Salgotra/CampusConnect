"use client";

import { useEffect, useState } from "react";
import api from "../../services/api";

export default function EditProfilePage() {
  const [branch, setBranch] = useState("");
  const [year, setYear] = useState("");
  const [skills, setSkills] = useState("");
  const [bio, setBio] = useState("");

  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [portfolio, setPortfolio] = useState("");

  const [image, setImage] =
    useState<File | null>(null);

  const [preview, setPreview] =
    useState("");

  const [message, setMessage] =
    useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token =
        localStorage.getItem("token");

      const res = await api.get(
        "/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBranch(res.data.branch || "");
      setYear(res.data.year || "");

      setSkills(
        res.data.skills
          ? res.data.skills.join(", ")
          : ""
      );

      setBio(res.data.bio || "");

      setGithub(
        res.data.github || ""
      );

      setLinkedin(
        res.data.linkedin || ""
      );

      setPortfolio(
        res.data.portfolio || ""
      );

      if (
        res.data.profileImage
      ) {
        setPreview(
          `http://localhost:5000${res.data.profileImage}`
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const uploadImage =
    async () => {
      if (!image) return;

      try {
        const token =
          localStorage.getItem(
            "token"
          );

        const formData =
          new FormData();

        formData.append(
          "image",
          image
        );

        await api.post(
          "/profile/upload-image",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type":
                "multipart/form-data",
            },
          }
        );

        fetchProfile();
      } catch (error) {
        console.log(error);
      }
    };

  const handleSubmit =
    async (
      e: React.FormEvent<HTMLFormElement>
    ) => {
      e.preventDefault();

      try {
        const token =
          localStorage.getItem(
            "token"
          );

        const res =
          await api.put(
            "/profile",
            {
              branch,
              year,
              skills: skills
                .split(",")
                .map((skill) =>
                  skill.trim()
                )
                .filter(Boolean),

              bio,
              github,
              linkedin,
              portfolio,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

        await uploadImage();

        setMessage(
          res.data.message
        );
      } catch (error) {
        console.log(error);
        setMessage(
          "Update Failed"
        );
      }
    };

  return (
    <main className="min-h-screen bg-black text-white py-10 px-4">
      <div className="max-w-2xl mx-auto bg-gray-950 border border-gray-800 rounded-2xl p-8">

        <h1 className="text-4xl font-bold text-center mb-8">
          Edit Profile
        </h1>

        <div className="flex flex-col items-center mb-8">

          <img
            src={
              preview ||
              "https://via.placeholder.com/120"
            }
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border border-gray-700"
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file =
                e.target.files?.[0];

              if (file) {
                setImage(file);

                setPreview(
                  URL.createObjectURL(
                    file
                  )
                );
              }
            }}
            className="mt-4"
          />

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="text"
            placeholder="Branch"
            value={branch}
            onChange={(e) =>
              setBranch(
                e.target.value
              )
            }
            className="w-full p-3 rounded-lg bg-black border border-gray-700"
          />

          <input
            type="text"
            placeholder="Year"
            value={year}
            onChange={(e) =>
              setYear(
                e.target.value
              )
            }
            className="w-full p-3 rounded-lg bg-black border border-gray-700"
          />

          <input
            type="text"
            placeholder="Skills"
            value={skills}
            onChange={(e) =>
              setSkills(
                e.target.value
              )
            }
            className="w-full p-3 rounded-lg bg-black border border-gray-700"
          />

          <textarea
            placeholder="Bio"
            value={bio}
            onChange={(e) =>
              setBio(
                e.target.value
              )
            }
            className="w-full p-3 rounded-lg bg-black border border-gray-700 h-28"
          />

          <input
            type="text"
            placeholder="GitHub URL"
            value={github}
            onChange={(e) =>
              setGithub(
                e.target.value
              )
            }
            className="w-full p-3 rounded-lg bg-black border border-gray-700"
          />

          <input
            type="text"
            placeholder="LinkedIn URL"
            value={linkedin}
            onChange={(e) =>
              setLinkedin(
                e.target.value
              )
            }
            className="w-full p-3 rounded-lg bg-black border border-gray-700"
          />

          <input
            type="text"
            placeholder="Portfolio URL"
            value={portfolio}
            onChange={(e) =>
              setPortfolio(
                e.target.value
              )
            }
            className="w-full p-3 rounded-lg bg-black border border-gray-700"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg"
          >
            Save Profile
          </button>

        </form>

        {message && (
          <p className="text-green-400 text-center mt-4">
            {message}
          </p>
        )}

      </div>
    </main>
  );
}