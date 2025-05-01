import { BotMessageSquare } from "lucide-react";

export default function ChatLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen max-h-[100svh]">
      <h2 className="flex min-h-[10%] items-center justify-center gap-2 p-4 text-xl font-bold">
        <BotMessageSquare size={35} color="hsl(142.1 76.2% 36.3%)" />
        vivy
      </h2>
      <div className="relative min-h-[88%] p-4">{children}</div>
    </div>
  );
}
