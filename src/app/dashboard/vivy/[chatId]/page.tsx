import VivyChat from "@/components/vivy-chat/VivyChat";

// type ChatPageProps = {
//   params: {
//     id: string;
//   };
// };

export default async function ChatPage() {
  // const chatId = params.id;

  // Validate the chat exists
  // const chat = await db.query.vivyChats.findFirst({
  //   where: (chats, { eq }) => eq(chats.id, chatId)
  // });

  // if (!chat) {
  //   return notFound();
  // }

  // Fetch messages for that chat
  // const chatMessages = await db
  //   .select()
  //   .from(vivyMessages)
  //   .where(eq(vivyMessages.chatId, chatId));

  return <VivyChat />;
}
