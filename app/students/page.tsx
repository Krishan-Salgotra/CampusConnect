"use client";

import { useEffect, useState } from "react";
import api from "../../services/api";
import Link from "next/link";

export default function StudentsPage() {
  const [students, setStudents] = useState<any[]>([]);
  const [filteredStudents, setFilteredStudents] =
    useState<any[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    const filtered = students.filter(
      (student) =>
        student.name
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        student.email
          ?.toLowerCase()
          .includes(search.toLowerCase())
    );

    setFilteredStudents(filtered);
  }, [search, students]);

  const fetchStudents = async () => {
    try {
      const res = await api.get("/users");

      setStudents(res.data);
      setFilteredStudents(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-5xl font-bold text-center mb-8">
          Student Directory
        </h1>

        <div className="mb-8">
          <input
            type="text"
            placeholder="Search students..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full bg-gray-900 border border-gray-700 rounded-xl p-4"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">

          {filteredStudents.map((student) => (
            <div
              key={student._id}
              className="bg-gray-900 border border-gray-800 rounded-xl p-6"
            >
              <div className="flex items-center gap-4 mb-4">

                {student.profileImage ? (
                  <img
                    src={`http://localhost:5000${student.profileImage}`}
                    alt={student.name}
                    className="w-14 h-14 rounded-full object-cover border border-gray-700"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center text-xl font-bold">
                    {student.name?.charAt(0)}
                  </div>
                )}

                <div>
                  <h2 className="text-2xl font-bold">
                    {student.name}
                  </h2>

                  <p className="text-gray-400">
                    {student.email}
                  </p>
                </div>

              </div>

              <Link href={`/students/${student._id}`}>
                <button
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
                >
                  View Profile
                </button>
              </Link>

            </div>
          ))}

        </div>
      </div>
    </main>
  );
}