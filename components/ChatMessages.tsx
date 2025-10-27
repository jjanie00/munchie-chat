"use client";

import { useEffect, useRef, useState } from "react";
import { useModalStore } from "@/store/useModalstore";
import { supabase } from "@/lib/supabase";
interface Message {
  id: number;
  imageUrl?: string; // 임시 옵셔널 체이닝
  description?: string;
  isOwn: boolean;
  timestamp: string;
}

export default function ChatMessages() {
  const modalData = useModalStore((state) => state.modalData);
  const observerTarget = useRef<HTMLDivElement>(null);
  const isLoadingRef = useRef(false);

  useEffect(() => {
    // early return in server rendering
    if (typeof window === "undefined") return;
    //
    const observer = new IntersectionObserver(
      /**
       * callback function
       * @param entries - 화면에 보이는 전체 데이터
       */
      (entries: IntersectionObserverEntry[]) => {
        let isLoading = isLoadingRef.current;
        // 트리거가 보이고 로딩 중이 아닐 때
        // todo :: newMessage 가 아닌 supabase 에서 가져오기
        if (entries[0].isIntersecting && !isLoading) {
          isLoading = true;
          const newMessage = {
            id: Math.random() * 1000000,
            description: "메시지 로딩중...",
            isOwn: false,
            timestamp: new Date().toLocaleTimeString(),
          };
          setMessages((prev) => [...prev, newMessage]);
          isLoading = false;
        }
      },
      // option
      // 트리거 요소가 화면에 100% 보일 때 감시 활성화
      { threshold: 1.0 }
    );

    // 트리거 요소가 존재할 떄 감시 시작
    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }
    // cleanup
    return () => observer.disconnect();
  }, []);

  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    // 모달 데이터 존재 시 메시지 추가
    if (modalData) {
      setMessages((prev) => [...prev, modalData]);
    }
  }, [modalData]);

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

      <div className="h-4">
        {/* 스크롤 트리거 */}
        <div ref={observerTarget} className="h-1" />
      </div>
    </div>
  );
}
