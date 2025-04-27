import { useRef, type KeyboardEvent } from "react";
import { SendHorizontal, Paperclip } from "lucide-react";
import clsx from "clsx";
// import { EmojiPicker } from './EmojiPicker';

type ChatTextAreaProps = {
  onSendMessage: (message: string) => void;
  onTyping?: (isTyping: boolean) => void;
  placeholder?: string;
  disabled?: boolean;
  message: string;
  setMessage: (message: string) => void;
};

export const ChatTextArea: React.FC<ChatTextAreaProps> = ({
  message,
  setMessage,
  onSendMessage,
  //   onTyping,
  placeholder = "Type your message...",
  disabled = false
}) => {
  //   const [isTyping, setIsTyping] = useState(false);
  //   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSendMessage = () => {
    if (message.trim() === "") return;

    onSendMessage(message);
    setMessage("");
    // setIsTyping(false);
    // if (onTyping) onTyping(false);

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleInput = () => {
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        200
      )}px`;
    }

    // const currentlyTyping = message.trim().length > 0;
    // if (currentlyTyping !== isTyping) {
    //   setIsTyping(currentlyTyping);
    //   if (onTyping) onTyping(currentlyTyping);
    // }
  };

  //   const handleEmojiSelect = (emoji: string) => {
  //     setMessage(prev => prev + emoji);
  //     setShowEmojiPicker(false);
  //     textareaRef.current?.focus();
  //   };

  return (
    <div className="absolute bottom-0 left-0 mb-0 mt-auto w-full border-t border-gray-200 bg-white p-3">
      {/* {showEmojiPicker && (
        <div className="absolute bottom-16 left-4 z-10">
          <EmojiPicker onSelect={handleEmojiSelect} />
        </div>
      )} */}

      <div className="flex items-center gap-2">
        <button
          className="p-2 text-gray-500 transition-colors hover:text-gray-700"
          disabled={disabled}>
          <Paperclip size={24} />
        </button>

        {/* Emoji button
        <button
          className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          disabled={disabled}
        >
          <IoMdHappy size={24} />
        </button> */}

        <div className="relative flex-1">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            onKeyDown={handleKeyDown}
            onInput={handleInput}
            placeholder={placeholder}
            disabled={disabled}
            rows={1}
            className="w-full resize-none overflow-hidden rounded-full border border-gray-300 px-4 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
            style={{ minHeight: "44px", maxHeight: "200px" }}
          />
        </div>

        {/* Send button */}
        <button
          onClick={handleSendMessage}
          disabled={disabled || message.trim().length === 0}
          className={clsx(
            "rounded-full p-2 transition-colors",
            message.trim().length > 0
              ? "bg-primary text-white hover:bg-primary"
              : "cursor-not-allowed text-gray-400 opacity-50"
          )}>
          <SendHorizontal size={20} />
        </button>
      </div>
    </div>
  );
};
