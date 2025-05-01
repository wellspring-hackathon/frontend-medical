import { BotMessageSquare } from "lucide-react";

export default function ChatLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-h-[100svh] w-full">
      <h2 className="flex min-h-[10%] items-center justify-center gap-2 p-4 text-xl font-bold">
        <BotMessageSquare size={35} color="hsl(142.1 76.2% 36.3%)" />
        vivy
      </h2>
      <div className="relative p-4">{children}</div>
    </div>
  );
}
