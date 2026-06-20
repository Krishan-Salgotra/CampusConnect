"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "../../../services/api";

export default function StudentProfilePage() {
  const params = useParams();

  const [student, setStudent] =
    useState<any>(null);

  useEffect(() => {
    fetchStudent();
  }, []);

  const fetchStudent = async () => {
    try {
      const res = await api.get("/users");

      const foundUser = res.data.find(
        (u: any) => u._id === params.id
      );

      setStudent(foundUser);
    } catch (error) {
      console.log(error);
    }
  };

  if (!student) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <div className="max-w-4xl mx-auto bg-gray-900 border border-gray-800 rounded-2xl p-8">

        <div className="flex flex-col md:flex-row items-center gap-6 mb-8">

          {student.profileImage ? (
            <img
              src={`http://localhost:5000${student.profileImage}`}
              alt={student.name}
              className="w-32 h-32 rounded-full object-cover border-2 border-blue-500"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-blue-600 flex items-center justify-center text-5xl font-bold">
              {student.name?.charAt(0)}
            </div>
          )}

          <div>
            <h1 className="text-4xl font-bold">
              {student.name}
            </h1>

            <p className="text-gray-400 text-lg">
              {student.email}
            </p>
          </div>

        </div>

        <div className="grid md:grid-cols-2 gap-5">

          <div className="bg-gray-950 p-5 rounded-xl">
            <h2 className="text-xl font-bold mb-3">
              Branch
            </h2>

            <p>
              {student.branch || "Not Added"}
            </p>
          </div>

          <div className="bg-gray-950 p-5 rounded-xl">
            <h2 className="text-xl font-bold mb-3">
              Year
            </h2>

            <p>
              {student.year || "Not Added"}
            </p>
          </div>

        </div>

        <div className="bg-gray-950 p-5 rounded-xl mt-5">
          <h2 className="text-xl font-bold mb-3">
            Bio
          </h2>

          <p>
            {student.bio || "No bio available"}
          </p>
        </div>

        <div className="bg-gray-950 p-5 rounded-xl mt-5">
          <h2 className="text-xl font-bold mb-3">
            Skills
          </h2>

          {student.skills &&
          student.skills.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {student.skills.map(
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
          ) : (
            <p>No skills added</p>
          )}
        </div>

        <div className="bg-gray-950 p-5 rounded-xl mt-5">
          <h2 className="text-xl font-bold mb-4">
            Links
          </h2>

          <div className="space-y-3">

            {student.github && (
              <a
                href={student.github}
                target="_blank"
                rel="noreferrer"
                className="block text-blue-400 hover:text-blue-300"
              >
                🔗 GitHub
              </a>
            )}

            {student.linkedin && (
              <a
                href={student.linkedin}
                target="_blank"
                rel="noreferrer"
                className="block text-blue-400 hover:text-blue-300"
              >
                💼 LinkedIn
              </a>
            )}

            {student.portfolio && (
              <a
                href={student.portfolio}
                target="_blank"
                rel="noreferrer"
                className="block text-blue-400 hover:text-blue-300"
              >
                🌐 Portfolio
              </a>
            )}

            {!student.github &&
              !student.linkedin &&
              !student.portfolio && (
                <p>No links added</p>
              )}

          </div>
        </div>

      </div>
    </main>
  );
}