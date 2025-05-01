import Image from "next/image";
import { BotMessageSquare } from "lucide-react";

// type Message = {
//   id: string;
//   text: string;
//   sender: 'user' | 'other';
//   timestamp: Date;
//   status?: 'sending' | 'sent' | 'delivered' | 'read' | 'error';
// };

type ChatBubbleProps = {
  message: string;
  isUser: boolean;
  timestamp: Date;
  showTimestamp?: boolean;
  showStatus?: boolean;
  userAvatar?: string;
  otherAvatar?: string;
};

export const ChatBubble: React.FC<ChatBubbleProps> = ({
  message,
  isUser,
  timestamp,
  showTimestamp = true,
  userAvatar
}) => {
  //   const statusColors = {
  //     sending: 'text-gray-400',
  //     sent: 'text-gray-400',
  //     delivered: 'text-blue-400',
  //     read: 'text-blue-600',
  //     error: 'text-red-500',
  //   };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false
    });
  };

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
      {/* Other person's avatar (left side) */}
      {!isUser && (
        <div className="mr-2 flex-shrink-0">
          <BotMessageSquare size={35} color="hsl(142.1 76.2% 36.3%)" />
        </div>
      )}

      <div className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}>
        {/* Message bubble */}
        <div
          className={`max-w-xs rounded-lg px-4 py-2 lg:max-w-md ${
            isUser
              ? "rounded-br-none bg-primary text-white"
              : "rounded-bl-none bg-gray-200 text-gray-800"
          }`}>
          <p className="break-words">{message}</p>
        </div>

        {/* Timestamp and status */}
        <div
          className={`mt-1 flex items-center text-xs ${isUser ? "flex-row-reverse" : ""}`}>
          {showTimestamp && (
            <span className={`text-gray-500 ${isUser ? "ml-2" : "mr-2"}`}>
              {formatTime(timestamp)}
            </span>
          )}

          {/* {showStatus && message.status && isUser && (
            <span className={statusColors[message.status]}>
              {message.status === 'sending' && (
                <svg className="w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
              {message.status === 'sent' && '✓'}
              {message.status === 'delivered' && '✓✓'}
              {message.status === 'read' && '✓✓ (read)'}
              {message.status === 'error' && '⚠'}
            </span>
          )} */}
        </div>
      </div>

      {/* User's avatar (right side) */}
      {isUser && userAvatar && (
        <div className="ml-2 flex-shrink-0">
          <Image
            width={50}
            height={50}
            src={userAvatar}
            alt="You"
            className="h-8 w-8 rounded-full object-cover"
          />
        </div>
      )}
    </div>
  );
};
