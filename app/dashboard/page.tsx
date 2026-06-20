"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "../../services/api";
import ProtectedRoute from "../../components/ProtectedRoute";

export default function DashboardPage() {
  const router = useRouter();

  const [unreadCount, setUnreadCount] =
    useState(0);

  const [user, setUser] =
    useState<any>(null);

  const [profileImage, setProfileImage] =
    useState("");

  useEffect(() => {
    const savedUser =
      localStorage.getItem("user");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    fetchNotifications();
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

      if (res.data.profileImage) {
        setProfileImage(
          `http://localhost:5000${res.data.profileImage}`
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchNotifications = async () => {
    try {
      const token =
        localStorage.getItem("token");

      const res = await api.get(
        "/notifications",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const unread =
        res.data.filter(
          (notification: any) =>
            !notification.isRead
        ).length;

      setUnreadCount(unread);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    router.push("/login");
  };

  return (
  <ProtectedRoute>
    <main className="min-h-screen bg-black text-white p-10">
      <div className="max-w-6xl mx-auto">

        <div className="flex justify-between items-center mb-8">

          <h1 className="text-5xl font-bold">
            CampusConnect Dashboard
          </h1>

          <div className="flex items-center gap-5">

            <Link href="/notifications">
              <div className="relative cursor-pointer text-3xl">
                🔔

                {unreadCount > 0 && (
                  <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs px-2 py-1 rounded-full">
                    {unreadCount}
                  </span>
                )}
              </div>
            </Link>

            <div className="flex items-center gap-3">

              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-12 h-12 rounded-full object-cover border border-gray-700"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center font-bold">
                  {user?.name?.charAt(0)}
                </div>
              )}

              <span className="font-semibold">
                {user?.name}
              </span>

            </div>

            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg"
            >
              Logout
            </button>

          </div>

        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-8">
          <h2 className="text-3xl font-bold">
            Welcome, {user?.name || "Student"} 👋
          </h2>

          <p className="text-gray-400 mt-2">
            Ready to build your next project?
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">

          <Link href="/projects">
            <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl hover:border-blue-500">
              <h2 className="text-2xl font-bold">
                Browse Projects
              </h2>
            </div>
          </Link>

          <Link href="/my-projects">
            <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl hover:border-blue-500">
              <h2 className="text-2xl font-bold">
                My Projects
              </h2>
            </div>
          </Link>

          <Link href="/requests">
            <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl hover:border-blue-500">
              <h2 className="text-2xl font-bold">
                Requests
              </h2>
            </div>
          </Link>

          <Link href="/notifications">
            <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl hover:border-blue-500">
              <h2 className="text-2xl font-bold">
                Notifications
              </h2>
            </div>
          </Link>

          <Link href="/create-project">
            <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl hover:border-blue-500">
              <h2 className="text-2xl font-bold">
                Create Project
              </h2>
            </div>
          </Link>

          <Link href="/edit-profile">
            <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl hover:border-blue-500">
              <h2 className="text-2xl font-bold">
                Edit Profile
              </h2>
            </div>
          </Link>

          <Link href="/students">
            <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl hover:border-blue-500">
              <h2 className="text-2xl font-bold">
                Students Directory
              </h2>
            </div>
          </Link>

        </div>

      </div>
    </main>
  </ProtectedRoute>
);
}