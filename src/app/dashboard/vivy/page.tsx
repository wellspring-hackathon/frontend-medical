// app/chats/page.tsx
import Link from "next/link";
import { db } from "@/db/connect";
import { auth } from "@/lib/auth";

export default async function VivyChatPage() {
  const session = await auth();
  const userId = session?.user?.id as string;

  const chats = await db.query.vivyChats.findMany({
    where: (chats, { eq }) => eq(chats.userId, userId),
    orderBy: (chats, { desc }) => desc(chats.updatedAt)
  });
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Your Conversations</h1>
      <div className="grid gap-4 sm:grid-cols-2">
        {chats.map((chat) => (
          <Link
            key={chat.id}
            href={`/dashboard/chat/${chat.id}`}
            className="block rounded-2xl border border-gray-100 bg-white p-4 shadow transition duration-200 hover:shadow-md">
            <h2 className="line-clamp-1 text-lg font-semibold text-gray-800">
              {chat.title}
            </h2>
            <span className="mt-2 block text-xs text-gray-400">
              {new Date(chat.updatedAt).toLocaleString()}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
