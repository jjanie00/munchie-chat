"use client";

import { useState } from "react";

export default function ChatHeader() {
  const [userName] = useState("홍길동"); // 임시 사용자 이름

  return (
    <div className="bg-[#fee500] px-4 py-3 flex items-center justify-between border-b border-gray-200 shadow-sm">
      {/* 왼쪽 영역 */}
      <div className="flex items-center gap-3">
        <button className="p-1 hover:bg-black/10 rounded-full transition-colors">
          <svg
            className="w-6 h-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* 프로필 이미지 */}
        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
          <span className="text-sm font-medium text-gray-600">
            {userName.charAt(0)}
          </span>
        </div>

        {/* 사용자 이름 */}
        <div>
          <h1 className="text-lg font-semibold text-gray-800">{userName}</h1>
          <p className="text-xs text-gray-600">마지막 접속: 5분 전</p>
        </div>
      </div>

      {/* 오른쪽 영역 */}
      <div className="flex items-center gap-2">
        <button className="p-2 hover:bg-black/10 rounded-full transition-colors">
          <svg
            className="w-5 h-5 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
        </button>

        <button className="p-2 hover:bg-black/10 rounded-full transition-colors">
          <svg
            className="w-5 h-5 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
        </button>

        <button className="p-2 hover:bg-black/10 rounded-full transition-colors">
          <svg
            className="w-5 h-5 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
