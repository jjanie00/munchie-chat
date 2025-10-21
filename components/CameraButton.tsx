"use client";

import { useRef } from "react";

export default function CameraButton() {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div>
      <button
        onClick={() => inputRef.current?.click()}
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
          const file = e.target.files?.[0];
          if (file) {
            // 촬영한 이미지 출력
            console.log("선택된 파일:", file);
          }
        }}
      />
    </div>
  );
}
