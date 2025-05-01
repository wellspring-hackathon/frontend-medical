"use client";
import { useEffect, useRef, useState } from "react";
import { type messagesSelect } from "@/db/schema/vivyMessages";
import { useSession } from "next-auth/react";
import { ChatBubble } from "./ChatBubble";
import { ChatTextArea } from "./ChatTextBox";
import useSocket from "@/custom-hooks/useSockets";
import ChatSkeleton from "./ChatSuspense";

export default function VivyChat({
  initialMessages
}: {
  initialMessages: messagesSelect[];
  chatId: string;
}) {
  const session = useSession();
  const { chats, sendMessage } = useSocket();
  const [message, setMessage] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom on new message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats]);

  if (session.status === "loading") {
    return <ChatSkeleton />;
  }

  return (
    <div className="flex h-[100svh] flex-col">
      {/* Chat Messages */}
      <div className="scrollbar-ghost flex-1 space-y-3 overflow-y-auto px-4 py-4">
        {initialMessages.length > 0 &&
          chats.map((chat, i) => {
            const date = new Date(chat.milliseconds);
            return (
              <ChatBubble
                key={i}
                timestamp={date}
                message={chat.message}
                isUser={chat.senderId === session.data?.user?.id}
                userAvatar="/feeling_silly.svg"
                showTimestamp={true}
                showStatus={true}
              />
            );
          })}
        {/* Scroll anchor */}
        <div ref={bottomRef} />
      </div>

      {/* Chat Input Area */}
      <div className="sticky bottom-0 left-0 right-0 border-t bg-white px-4 py-3">
        <ChatTextArea
          message={message}
          onSendMessage={sendMessage}
          setMessage={setMessage}
          placeholder="Type your message..."
          disabled={false}
        />
      </div>
    </div>
  );
}
