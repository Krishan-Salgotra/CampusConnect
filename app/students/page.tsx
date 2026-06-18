"use client";

import { useEffect, useState } from "react";
import api from "../../services/api";

export default function StudentsPage() {
  const [students, setStudents] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await api.get("/profile/students");
      setStudents(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Student Directory
      </h1>

      <input
        type="text"
        placeholder="Search students..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full max-w-xl mx-auto block p-3 rounded-lg bg-gray-900 border border-gray-700 mb-10"
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStudents.map((student) => (
          <div
            key={student._id}
            className="bg-gray-950 border border-gray-800 rounded-xl p-5"
          >
            <h2 className="text-2xl font-bold mb-3">
              {student.name}
            </h2>

            <p>{student.email}</p>

            <p className="mt-2">
              <strong>Branch:</strong> {student.branch}
            </p>

            <p>
              <strong>Year:</strong> {student.year}
            </p>

            <p>
              <strong>Bio:</strong> {student.bio}
            </p>

            <p>
              <strong>Skills:</strong>{" "}
              {student.skills?.length
                ? student.skills.join(", ")
                : "Not Added"}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}