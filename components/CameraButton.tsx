"use client";

import { useRef, useState } from "react";
import PictureModal from "./PictureModal";

export default function CameraButton() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const handleButtonClick = () => {
    alert("버튼이 클릭되었습니다!");
    inputRef.current?.click();
  };
  return (
    <div>
      <button
        onClick={() => handleButtonClick()}
        className="fixed bottom-6 right-6 w-14 h-14 bg-white rounded-full items-center justify-center text-black"
      >
        📷
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="environment" // 후면 카메라
        className="hidden"
        onChange={(e) => {
          // 사용자가 사진 촬영한 이후 실행
          const image = e.target.files?.[0];
          if (image) {
            // 이미지 파일 형식 변환
            const imageUrl = URL.createObjectURL(image);
            // 모달 열기
            setIsOpen(true);
            // 이미지 url 설정
            setImageUrl(imageUrl);
          }
        }}
      />
      {isOpen && imageUrl && <PictureModal imageUrl={imageUrl} />}
    </div>
  );
}

// 이미지 문자열로 변환 후 PictureModal 에 전달
