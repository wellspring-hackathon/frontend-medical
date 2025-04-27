"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { type chatMessagesInsert } from "@/db/schema/chatMessage";
import { ChatBubble } from "./ChatBubble";
import { ChatTextArea } from "./ChatTextBox";

type ChatMessages = chatMessagesInsert & {
  milliseconds: number;
};

export default function UserChat() {
  const session = useSession();
  const [message, setMessage] = useState("");
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

  function sendMessage(message: string) {
    const now = new Date();
    const newChat = {
      consultationId: "1",
      senderId: "e5910e8c-62f1-4f77-88a7-3bc48bbb65b2",
      milliseconds: now.getTime(),
      message
    };
    setChats([...chats, newChat]);
  }
  return (
    <div className="relative">
      <div className="chats min-h-[80svh]">
        {chats.length > 0 &&
          chats.map((chat, i) => {
            const date = new Date(chat.milliseconds);
            return (
              <ChatBubble
                key={i}
                timestamp={date}
                message={chat.message}
                isUser={chat.senderId == session.data?.user?.id}
                userAvatar="/feeling_silly.svg"
                otherAvatar="/feeling_silly.svg"
                showTimestamp={true}
                showStatus={true}
              />
            );
          })}
      </div>
      <ChatTextArea
        message={message}
        onSendMessage={sendMessage}
        setMessage={setMessage}
        placeholder="Type your message..."
        disabled={false}
      />
    </div>
  );
}
