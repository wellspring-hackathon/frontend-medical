import { BotMessageSquare } from "lucide-react";

export default function ChatLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-[90svh]">
      <h2 className="flex items-center justify-center gap-2 p-4 text-xl font-bold">
        <BotMessageSquare size={35} color="hsl(142.1 76.2% 36.3%)" />
        vivy
      </h2>
      <main className="p-4">{children}</main>
    </div>
  );
}
