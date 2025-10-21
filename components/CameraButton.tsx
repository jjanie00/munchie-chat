"use client";

import { useRef, useState, useEffect } from "react";
import PictureModal from "./PictureModal";

export default function CameraButton() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const handleButtonClick = () => {
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
            const imageUrl = URL.createObjectURL(image);
            setIsOpen(true); // 모달 열기
            setImageUrl(imageUrl);
            URL.revokeObjectURL(imageUrl); // 메모리 누수 방지
          }
        }}
      />
      {isOpen && imageUrl && (
        <PictureModal
          imageUrl={imageUrl}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
