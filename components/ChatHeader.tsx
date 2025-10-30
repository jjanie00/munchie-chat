"use client";

import Image from "next/image";
import ProfileIcon from "@/assets/images/profile.png";

export default function ChatHeader() {
  const TEMP_USER_NAME = "munchie";
  const TEMP_LAST_ACCESS_TIME = "5분 전";

  return (
    <div className="bg-black text-white px-4 py-3 flex items-center justify-between border-b border-gray-200 shadow-sm">
      {/* 왼쪽 영역 */}
      <div className="flex items-center gap-3">
        {/* 프로필 이미지 */}
        <Image src={ProfileIcon} alt="프로필 이미지" width={32} height={32} />

        {/* 사용자 이름 */}
        <div>
          <h1 className="text-lg font-semibold text-white">{TEMP_USER_NAME}</h1>
          <p className="text-xs text-white">
            마지막 접속: {TEMP_LAST_ACCESS_TIME}
          </p>
        </div>
      </div>
    </div>
  );
}
