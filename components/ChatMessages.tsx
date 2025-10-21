"use client";

import { useState } from "react";

interface Message {
  id: number;
  text: string;
  isOwn: boolean;
  timestamp: string;
  type: "text" | "image";
}

export default function ChatMessages() {
  const [messages] = useState<Message[]>([
    {
      id: 1,
      text: "안녕하세요! 오늘 날씨가 정말 좋네요.",
      isOwn: false,
      timestamp: "오후 2:30",
      type: "text",
    },
    {
      id: 2,
      text: "네, 맞아요. 산책하기 딱 좋은 날씨 같아요.",
      isOwn: true,
      timestamp: "오후 2:32",
      type: "text",
    },
    {
      id: 3,
      text: "요즘 어떻게 지내세요?",
      isOwn: false,
      timestamp: "오후 2:35",
      type: "text",
    },
    {
      id: 4,
      text: "이미지 메모",
      isOwn: true,
      timestamp: "오후 2:35",
      type: "text",
    },
  ]);

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
                  <span className="text-xs font-medium text-gray-600">친</span>
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
              <p className="text-sm leading-relaxed">{message.text}</p>
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

      {/* 빈 공간 추가 */}
      <div className="h-4"></div>
    </div>
  );
}
