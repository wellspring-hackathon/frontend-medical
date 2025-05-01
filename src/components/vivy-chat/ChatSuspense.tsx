export default function ChatBubbleSkeleton() {
  return (
    <div className="flex flex-col space-y-3 p-4">
      {/* Incoming message skeleton */}
      <div className="flex items-start space-x-2">
        <div className="h-8 w-8 animate-pulse rounded-full bg-gray-200"></div>
        <div className="flex max-w-xs flex-col space-y-1">
          <div className="h-4 w-24 animate-pulse rounded-full bg-gray-200"></div>
          <div className="space-y-2 rounded-2xl rounded-tl-none bg-gray-100 px-4 py-2">
            <div className="h-3 w-full animate-pulse rounded-full bg-gray-200"></div>
            <div className="h-3 w-4/5 animate-pulse rounded-full bg-gray-200"></div>
          </div>
        </div>
      </div>

      {/* Outgoing message skeleton */}
      <div className="flex items-start justify-end space-x-2">
        <div className="flex max-w-xs flex-col items-end space-y-1">
          <div className="space-y-2 rounded-2xl rounded-tr-none bg-blue-100 px-4 py-2">
            <div className="h-3 w-3/4 animate-pulse rounded-full bg-blue-200"></div>
          </div>
          <div className="h-3 w-16 animate-pulse rounded-full bg-gray-200"></div>
        </div>
        <div className="h-8 w-8 animate-pulse rounded-full bg-gray-200"></div>
      </div>

      {/* Another incoming message */}
      <div className="flex items-start space-x-2">
        <div className="h-8 w-8 animate-pulse rounded-full bg-gray-200"></div>
        <div className="flex max-w-xs flex-col space-y-1">
          <div className="space-y-2 rounded-2xl rounded-tl-none bg-gray-100 px-4 py-2">
            <div className="h-3 w-5/6 animate-pulse rounded-full bg-gray-200"></div>
            <div className="h-3 w-1/2 animate-pulse rounded-full bg-gray-200"></div>
          </div>
        </div>
      </div>

      {/* Typing indicator */}
      <div className="flex items-start space-x-2">
        <div className="h-8 w-8 animate-pulse rounded-full bg-gray-200"></div>
        <div className="w-24 rounded-2xl rounded-tl-none bg-gray-100 px-4 py-3">
          <div className="flex space-x-1">
            <div className="h-2 w-2 animate-bounce rounded-full bg-gray-300"></div>
            <div
              className="h-2 w-2 animate-bounce rounded-full bg-gray-300"
              style={{ animationDelay: "0.2s" }}></div>
            <div
              className="h-2 w-2 animate-bounce rounded-full bg-gray-300"
              style={{ animationDelay: "0.4s" }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
