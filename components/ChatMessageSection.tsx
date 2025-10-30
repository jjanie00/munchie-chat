"use client";

import { useEffect, useRef, useState } from "react";
import { useModalStore } from "@/store/useModalstore";
import ChatMessageList from "./ChatMessageList";
import { Message } from "@/types";

export default function ChatMessagesSection() {
  const [messages, setMessages] = useState<Message[]>([]);
  const modalData = useModalStore((state) => state.modalData);
  const observerTarget = useRef<HTMLDivElement>(null);
  const isLoadingRef = useRef(false);

  // 새로운 매시지 추가 : Zustand store 에서 가져옴
  // 기존 메시지 렌더링 : supabse storage 에서 가져와서 map 으로 렌더링

  // 모달 데이터 존재 시 메시지 추가
  useEffect(() => {
    if (modalData) {
      setMessages((prev) => [...prev, modalData]);
    }
  }, [modalData]);

  // 무한 스크롤
  useEffect(() => {
    // 브라우저에서만 실행
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

  return (
    <>
      <ChatMessageList messages={messages} />
    </>
  );
}
