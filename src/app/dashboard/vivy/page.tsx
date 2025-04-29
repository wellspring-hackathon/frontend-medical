import { auth } from "@/lib/auth";

import UserChat from "@/components/chat/UserChat";
import AdminChat from "@/components/chat/AdminChat";
export default async function ChatPage() {
  const session = await auth();

  if (session?.user?.role === "admin") {
    return <AdminChat />;
  } else {
    return <UserChat />;
  }
}
