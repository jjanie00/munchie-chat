"use client";

import { useEffect, useRef, useState } from "react";
import { useModalStore } from "@/store/useModalstore";
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
        if (entries[0].isIntersecting && !isLoading) {
          isLoading = true;
          const newMessage = {
            id: Math.random() * 1000000,
            description: "새로운 메시지",
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

  const [messages, setMessages] = useState<Message[]>([
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
    {
      id: 4,
      description: "요즘은 새로운 프로젝트를 시작했어요. 정말 재미있어요!",
      isOwn: true,
      timestamp: "오후 2:37",
    },
    {
      id: 5,
      description: "오, 어떤 프로젝트인가요? 궁금하네요!",
      isOwn: false,
      timestamp: "오후 2:39",
    },
    {
      id: 6,
      description: "채팅 앱을 만들고 있어요. Next.js로 개발 중이에요.",
      isOwn: true,
      timestamp: "오후 2:41",
    },
    {
      id: 7,
      description: "와! 정말 멋지네요. 언제쯤 완성될 예정인가요?",
      isOwn: false,
      timestamp: "오후 2:43",
    },
    {
      id: 8,
      description:
        "아직 초기 단계라서 시간이 좀 걸릴 것 같아요. 하지만 차근차근 만들어가고 있어요.",
      isOwn: true,
      timestamp: "오후 2:45",
    },
    {
      id: 9,
      description: "화이팅! 완성되면 꼭 보여주세요 😊",
      isOwn: false,
      timestamp: "오후 2:47",
    },
    {
      id: 10,
      description: "네, 감사합니다! 완성되면 바로 알려드릴게요.",
      isOwn: true,
      timestamp: "오후 2:49",
    },
    {
      id: 11,
      description: "그런데 오늘 점심은 뭐 드셨나요?",
      isOwn: false,
      timestamp: "오후 2:52",
    },
    {
      id: 12,
      description: "김치찌개를 먹었어요. 맛있었어요!",
      isOwn: true,
      timestamp: "오후 2:54",
    },
    {
      id: 13,
      description: "아, 저도 김치찌개 좋아해요! 어디서 드셨나요?",
      isOwn: false,
      timestamp: "오후 2:56",
    },
    {
      id: 14,
      description: "집 근처 작은 식당에서요. 정말 맛있어요.",
      isOwn: true,
      timestamp: "오후 2:58",
    },
    {
      id: 15,
      description: "다음에 같이 가볼까요?",
      isOwn: false,
      timestamp: "오후 3:01",
    },
    {
      id: 16,
      description: "좋아요! 언제든지 연락주세요 😄",
      isOwn: true,
      timestamp: "오후 3:03",
    },
  ]);

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
