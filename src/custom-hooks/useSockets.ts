import { type Socket } from "socket.io-client";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { type chatMessagesInsert } from "@/db/schema/chatMessage";

type ChatMessages = chatMessagesInsert & {
  milliseconds: number;
};

export default function useSocket() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [chats, setChats] = useState<ChatMessages[]>([
    {
      consultationId: "1",
      senderId: "e5910e8c-62f1-4f77-88a7-3bc48bbb65b2",
      message: "hey buddy",
      milliseconds: new Date().getTime()
    },
    {
      consultationId: "1",
      senderId: "someguy-999",
      message: "hey dude",
      milliseconds: new Date().getTime()
    }
  ]);

  useEffect(() => {
    const newSocket = io("http://localhost:3001");
    if (newSocket) {
      setSocket(newSocket);
    }
    // Listen for messages
    newSocket.on("message", (chat) => {
      setChats((prev) => [...prev, { ...chat }]);
    });

    // Cleanup on unmount
    return () => {
      newSocket.disconnect();
    };
  }, []);

  function sendMessage(message: string) {
    const now = new Date();
    const myChat = {
      consultationId: "1",
      senderId: "e5910e8c-62f1-4f77-88a7-3bc48bbb65b2",
      milliseconds: now.getTime(),
      message
    };
    setChats((prev) => [...prev, myChat]);
    if (socket) {
      socket.emit("message", myChat);
    }
  }

  return { chats, sendMessage };
}
