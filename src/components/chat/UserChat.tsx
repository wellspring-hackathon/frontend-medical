"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { ChatBubble } from "./ChatBubble";
import { ChatTextArea } from "./ChatTextBox";
import useSocket from "@/custom-hooks/useSockets";
import ChatSkeleton from "./ChatSuspense";

export default function UserChat() {
  const session = useSession();
  const { chats, sendMessage } = useSocket();
  const [message, setMessage] = useState("");

  if (session.status === "loading") {
    return <ChatSkeleton />;
  }

  return (
    <>
      <div className="chats scrollbar-ghost mb-12 flex h-[72.5svh] flex-1 flex-col space-y-3 overflow-y-auto p-4">
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
    </>
  );
}
