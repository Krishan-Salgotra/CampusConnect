"use client";

import { useState } from "react";
import api from "../../services/api";

export default function ProjectDetailsPage() {
  const [message, setMessage] = useState("");

  const projectId = "PROJECT_ID_HERE";

  const sendRequest = async () => {
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
    } catch (error: any) {
      setMessage(
        error?.response?.data?.message ||
          "Failed to send request"
      );
    }
  };

  return (
    <main className="min-h-screen bg-black text-white flex justify-center items-center">
      <div className="bg-gray-950 border border-gray-800 rounded-2xl p-8 w-full max-w-2xl">
        <h1 className="text-4xl font-bold mb-6">
          CampusConnect Mobile App
        </h1>

        <p className="mb-4">
          Need React Native developer for Android
          version.
        </p>

        <p className="mb-2">
          Tech Stack: React Native, Node.js,
          MongoDB
        </p>

        <p className="mb-6">
          Posted By: Krish
        </p>

        <button
          onClick={sendRequest}
          className="bg-blue-600 px-6 py-3 rounded-lg"
        >
          Join Project
        </button>

        {message && (
          <p className="mt-4 text-green-400">
            {message}
          </p>
        )}
      </div>
    </main>
  );
}