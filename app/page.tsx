import ChatHeader from "@/components/ChatHeader";
import ChatMessagesSection from "@/components/ChatMessageSection";
import OpenCamera from "@/components/OpenCamera";

export default function Home() {
  return (
    <div className="h-screen flex flex-col bg-[#f2f3f5]">
      {/* 상단 헤더 */}
      <ChatHeader />

      {/* 채팅 메시지 영역 */}
      <div className="flex-1">
        <ChatMessagesSection />
      </div>

      {/* Floating 카메라 버튼 */}
      <OpenCamera />
    </div>
  );
}
