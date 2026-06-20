"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "../../services/api";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      const res = await api.post(
        "/auth/register",
        {
          name,
          email,
          password,
        }
      );

      setMessage(res.data.message);

      setName("");
      setEmail("");
      setPassword("");

      setTimeout(() => {
        router.push("/login");
      }, 1000);

    } catch (error: any) {
      setMessage(
        error.response?.data?.message ||
          "Registration Failed"
      );
    }
  };

  return (
    <main className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-full max-w-md border border-gray-800 rounded-2xl p-8 bg-gray-950">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">
          Register
        </h1>

        <form
          onSubmit={handleRegister}
          className="space-y-4"
        >
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="w-full p-3 rounded-lg bg-black border border-gray-700 text-white"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full p-3 rounded-lg bg-black border border-gray-700 text-white"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full p-3 rounded-lg bg-black border border-gray-700 text-white"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 py-3 rounded-lg text-white hover:bg-blue-700"
          >
            Register
          </button>
        </form>

        {message && (
          <p className="text-center text-green-400 mt-4">
            {message}
          </p>
        )}
      </div>
    </main>
  );
}