"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import api from "../../services/api";

export default function HomePage() {
  const [unreadCount, setUnreadCount] = useState(0);
  const [totalProjects, setTotalProjects] = useState(0);
  const [myProjects, setMyProjects] = useState(0);
  const [pendingRequests, setPendingRequests] = useState(0);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem("token");

      const notificationsRes = await api.get(
        "/notifications",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const unread =
        notificationsRes.data.filter(
          (notification: any) =>
            !notification.isRead
        ).length;

      setUnreadCount(unread);

      const projectsRes = await api.get(
        "/projects"
      );

      setTotalProjects(
        projectsRes.data.length
      );

      const user = JSON.parse(
        localStorage.getItem("user") || "{}"
      );

      const myProjectsList =
        projectsRes.data.filter(
          (project: any) => {
            const isOwner =
              project.createdBy?._id ===
              user._id;

            const isMember =
              project.teamMembers?.some(
                (member: any) =>
                  member._id === user._id
              );

            return (
              isOwner || isMember
            );
          }
        );

      setMyProjects(
        myProjectsList.length
      );

      const requestsRes = await api.get(
        "/requests",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const pending =
        requestsRes.data.filter(
          (request: any) =>
            request.status ===
            "pending"
        ).length;

      setPendingRequests(
        pending
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <div className="max-w-6xl mx-auto">

        <div className="flex justify-between items-center mb-10">
          <h1 className="text-5xl font-bold">
            CampusConnect
          </h1>

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
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-10">

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 text-center">
            <h2 className="text-3xl font-bold">
              {totalProjects}
            </h2>

            <p className="text-gray-400 mt-2">
              Total Projects
            </p>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 text-center">
            <h2 className="text-3xl font-bold">
              {myProjects}
            </h2>

            <p className="text-gray-400 mt-2">
              My Projects
            </p>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 text-center">
            <h2 className="text-3xl font-bold">
              {pendingRequests}
            </h2>

            <p className="text-gray-400 mt-2">
              Pending Requests
            </p>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 text-center">
            <h2 className="text-3xl font-bold">
              {unreadCount}
            </h2>

            <p className="text-gray-400 mt-2">
              Notifications
            </p>
          </div>

        </div>

        <div className="grid md:grid-cols-2 gap-6">

          <Link href="/projects">
            <div className="bg-gray-900 p-6 rounded-xl hover:border-blue-500 border border-gray-800">
              <h2 className="text-2xl font-bold">
                Browse Projects
              </h2>
            </div>
          </Link>

          <Link href="/my-projects">
            <div className="bg-gray-900 p-6 rounded-xl hover:border-blue-500 border border-gray-800">
              <h2 className="text-2xl font-bold">
                My Projects
              </h2>
            </div>
          </Link>

          <Link href="/requests">
            <div className="bg-gray-900 p-6 rounded-xl hover:border-blue-500 border border-gray-800">
              <h2 className="text-2xl font-bold">
                Requests
              </h2>
            </div>
          </Link>

          <Link href="/profile">
            <div className="bg-gray-900 p-6 rounded-xl hover:border-blue-500 border border-gray-800">
              <h2 className="text-2xl font-bold">
                Profile
              </h2>
            </div>
          </Link>

        </div>

      </div>
    </main>
  );
}