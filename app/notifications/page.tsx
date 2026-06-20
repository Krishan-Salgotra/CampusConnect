"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "../../services/api";

export default function NotificationsPage() {
  const router = useRouter();

  const [notifications, setNotifications] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

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

      setNotifications(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (
    notificationId: string
  ) => {
    try {
      const token =
        localStorage.getItem("token");

      await api.put(
        `/notifications/${notificationId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchNotifications();
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl font-bold mb-8">
        Notifications
      </h1>

      {notifications.length === 0 ? (
        <div className="text-gray-400">
          No notifications yet.
        </div>
      ) : (
        <div className="space-y-4">
          {notifications.map(
            (notification) => (
              <div
                key={notification._id}
                className={`p-5 rounded-xl border ${
                  notification.isRead
                    ? "bg-gray-900 border-gray-800"
                    : "bg-blue-950 border-blue-600"
                }`}
              >
                <p className="mb-3">
                  {notification.message}
                </p>

                <p className="text-sm text-gray-400 mb-4">
                  {new Date(
                    notification.createdAt
                  ).toLocaleString()}
                </p>

                <div className="flex gap-3 flex-wrap">

                  {!notification.isRead && (
                    <button
                      onClick={() =>
                        markAsRead(
                          notification._id
                        )
                      }
                      className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
                    >
                      Mark as Read
                    </button>
                  )}

                  {notification.message.includes(
                    "join request"
                  ) && (
                    <button
                      onClick={() =>
                        router.push(
                          "/requests"
                        )
                      }
                      className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg"
                    >
                      View Requests
                    </button>
                  )}

                </div>
              </div>
            )
          )}
        </div>
      )}
    </main>
  );
}