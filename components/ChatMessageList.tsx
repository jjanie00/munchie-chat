import React from "react";
import { Message } from "@/types";

interface ChatMessageListProps {
  messages: Message[];
}

export default function ChatMessageList({ messages }: ChatMessageListProps) {
  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-[#f2f3f5]">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}
        >
          <div className={`max-w-xs lg:max-w-md`}>
            {!message.isOwn && (
              <div className="flex items-center gap-2 mb-1">
                <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-xs font-medium text-gray-600">
                    친구
                  </span>
                </div>
                <span className="text-xs text-gray-500">친구</span>
              </div>
            )}

            <div
              className={`px-4 py-2 rounded-2xl ${
                message.isOwn
                  ? "bg-black text-white rounded-br-md"
                  : "bg-white text-gray-800 rounded-bl-md shadow-sm"
              }`}
            >
              {/* 임시 메시지 */}
              {message.imageUrl && (
                <img
                  src={message.imageUrl}
                  className="w-full h-auto rounded-lg"
                  alt="image"
                />
              )}
              <p className="text-sm leading-relaxed">{message.description}</p>
            </div>

            <div
              className={`text-xs text-gray-500 mt-1 px-2 ${
                message.isOwn ? "text-right" : "text-left"
              }`}
            >
              {message.timestamp}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
