"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "../../../services/api";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

export default function ChatPage() {
  const params = useParams();

  const projectId =
    params?.projectID as string;

  const [messages, setMessages] =
    useState<any[]>([]);

  const [text, setText] =
    useState("");

  useEffect(() => {
    if (!projectId) return;

    fetchMessages();

    socket.emit(
      "joinProject",
      projectId
    );

    socket.on(
      "newMessage",
      (message) => {
        setMessages(
          (prev) => [
            ...prev,
            message,
          ]
        );
      }
    );

    return () => {
      socket.off(
        "newMessage"
      );
    };
  }, [projectId]);

  const fetchMessages =
    async () => {
      try {
        const token =
          localStorage.getItem(
            "token"
          );

        const res =
          await api.get(
            `/messages/${projectId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

        setMessages(
          res.data
        );
      } catch (error) {
        console.log(
          error
        );
      }
    };

  const sendMessage =
    async () => {
      if (
        !text.trim()
      )
        return;

      try {
        const token =
          localStorage.getItem(
            "token"
          );

        await api.post(
          "/messages",
          {
            projectId,
            text,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setText("");
      } catch (error) {
        console.log(
          error
        );
      }
    };

  return (
    <main className="min-h-screen bg-black text-white flex flex-col">
      <div className="p-5 border-b border-gray-800">
        <h1 className="text-3xl font-bold">
          Project Chat
        </h1>
      </div>

      <div className="flex-1 p-5 overflow-y-auto space-y-4">
        {messages.map(
          (msg) => (
            <div
              key={
                msg._id
              }
              className="bg-gray-900 p-4 rounded-xl"
            >
              <p className="font-bold text-blue-400">
                {
                  msg
                    .sender
                    ?.name
                }
              </p>

              <p>
                {
                  msg.text
                }
              </p>
            </div>
          )
        )}
      </div>

      <div className="p-5 border-t border-gray-800 flex gap-3">
        <input
          value={
            text
          }
          onChange={(
            e
          ) =>
            setText(
              e.target
                .value
            )
          }
          placeholder="Type message..."
          className="flex-1 bg-gray-900 border border-gray-700 rounded-lg p-3"
        />

        <button
          onClick={
            sendMessage
          }
          className="bg-blue-600 hover:bg-blue-700 px-6 rounded-lg"
        >
          Send
        </button>
      </div>
    </main>
  );
}