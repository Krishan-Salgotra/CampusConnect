"use client";

import { useEffect, useState } from "react";
import api from "../../services/api";

export default function RequestsPage() {
  const [requests, setRequests] = useState<any[]>([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/requests", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setRequests(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (
    requestId: string,
    status: string
  ) => {
    try {
      const token = localStorage.getItem("token");

      await api.put(
        `/requests/${requestId}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchRequests();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-5xl font-bold text-center mb-10">
        Collaboration Requests
      </h1>

      <div className="max-w-4xl mx-auto space-y-5">
        {requests.length === 0 ? (
          <p>No requests available</p>
        ) : (
          requests.map((request) => (
            <div
              key={request._id}
              className="bg-gray-950 border border-gray-800 rounded-2xl p-5"
            >
              <h2 className="text-xl font-bold">
                {request.projectId?.title}
              </h2>

              <p className="mt-2">
                Student: {request.senderId?.name}
              </p>

              <p>
                Email: {request.senderId?.email}
              </p>

              <p className="mt-2">
                Status:
                <span className="ml-2 font-bold">
                  {request.status}
                </span>
              </p>

              {request.status === "pending" && (
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() =>
                      updateStatus(
                        request._id,
                        "accepted"
                      )
                    }
                    className="bg-green-600 px-4 py-2 rounded-lg"
                  >
                    Accept
                  </button>

                  <button
                    onClick={() =>
                      updateStatus(
                        request._id,
                        "rejected"
                      )
                    }
                    className="bg-red-600 px-4 py-2 rounded-lg"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </main>
  );
}