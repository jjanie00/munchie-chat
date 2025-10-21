import ChatHeader from "@/components/ChatHeader";
import ChatMessages from "@/components/ChatMessages";
import CameraButton from "@/components/CameraButton";

export default function Home() {
  return (
    <div className="h-screen flex flex-col bg-[#f2f3f5]">
      {/* 상단 헤더 */}
      <ChatHeader />

      {/* 채팅 메시지 영역 */}
      <div className="flex-1 overflow-hidden">
        <ChatMessages />
      </div>

      {/* Floating 카메라 버튼 */}
      <CameraButton />
    </div>
  );
}
