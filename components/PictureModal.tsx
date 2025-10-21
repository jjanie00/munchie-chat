import React, { useState } from "react";

interface PictureModalProps {
  imageUrl: string;
}

/**
 * 촬영한 사진을 표시하는 모달 컴포넌트
 * @param {string} props.imageUrl - 촬영한 사진의 URL
 * @returns {JSX.Element}
 */
export default function PictureModal({ imageUrl }: PictureModalProps) {
  return (
    <div>
      <img src={imageUrl} alt="Picture" width={100} height={100} />
    </div>
  );
}

/**
 * 이미지 모달 화면 정중앙 위치
 * 모달 커스텀
 */
