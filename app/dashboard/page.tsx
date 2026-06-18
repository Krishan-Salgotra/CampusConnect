"use client";

import { useEffect, useState } from "react";
import api from "../../services/api";

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await api.get("/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="border border-gray-800 rounded-2xl p-8 bg-gray-950 w-full max-w-lg">
        <h1 className="text-3xl font-bold mb-6">
          Dashboard
        </h1>

        {user ? (
          <div className="space-y-3">
            <p>
              <strong>Name:</strong> {user.name}
            </p>

            <p>
              <strong>Email:</strong> {user.email}
            </p>

            <p>
              <strong>Branch:</strong> {user.branch}
            </p>

            <p>
              <strong>Year:</strong> {user.year}
            </p>

            <p>
              <strong>Bio:</strong> {user.bio}
            </p>

            <div className="flex flex-wrap gap-3 mt-6">
              <a
                href="/students"
                className="bg-blue-600 px-4 py-2 rounded-lg"
              >
                Students
              </a>

              <a
                href="/edit-profile"
                className="bg-green-600 px-4 py-2 rounded-lg"
              >
                Edit Profile
              </a>

              <a
                href="/projects"
                className="bg-purple-600 px-4 py-2 rounded-lg"
              >
                Projects
              </a>

              <a
                href="/create-project"
                className="bg-orange-600 px-4 py-2 rounded-lg"
              >
                Create Project
              </a>
            </div>
          </div>
        ) : (
          <p>Loading profile...</p>
        )}
      </div>
    </main>
  );
}