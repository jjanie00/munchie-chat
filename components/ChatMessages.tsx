"use client";

import { useState } from "react";
import { useModalStore } from "@/store/useModalstore";

interface Message {
  id: number;
  imageUrl?: string;
  description: string;
  isOwn: boolean;
  timestamp: string;
}

export default function ChatMessages() {
  // get modalData from modalStore
  const modalData = useModalStore((state) => state.modalData);
  console.log("modalData", modalData);

  const [messages] = useState<Message[]>([
    {
      id: 1,
      description: "안녕하세요! 오늘 날씨가 정말 좋네요.",
      isOwn: false,
      timestamp: "오후 2:30",
    },
    {
      id: 2,
      description: "네, 맞아요. 산책하기 딱 좋은 날씨 같아요.",
      isOwn: true,
      timestamp: "오후 2:32",
    },
    {
      id: 3,
      description: "요즘 어떻게 지내세요?",
      isOwn: false,
      timestamp: "오후 2:35",
    },
  ]);

  // add modalData to messages
  if (modalData) {
    messages.push({
      id: messages.length + 1,
      // imageUrl: modalData.imageUrl,
      description: modalData.description,
      isOwn: true,
      timestamp: "오후 2:35",
    });
  }

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-[#f2f3f5]">
      {messages.map((message: Message) => (
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
              {/* temporary message rendering */}
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

      <div className="h-4"></div>
    </div>
  );
}
