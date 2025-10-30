"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import PictureModal from "./PictureModal";
import PlusIcon from "@/assets/icons/PlusIcon";

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
        className="fixed bottom-6 right-6 cursor-pointer transition-transform hover:scale-110 duration-300"
      >
        <PlusIcon />
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
            setImageUrl(imageUrl);
            setIsOpen(true); // 모달 열기
          }
        }}
      />
      {isOpen && imageUrl && (
        <PictureModal
          imageUrl={imageUrl}
          isOpen={isOpen}
          onClose={() => {
            setIsOpen(false);
            URL.revokeObjectURL(imageUrl); // 메모리 누수 방지
            setImageUrl(""); // 상태 초기화
          }}
        />
      )}
    </div>
  );
}
