// 카메라 화면 이후 열리는 모달

import React, { useState } from "react";

interface PictureModalProps {
  imageUrl: string;
}

export default function PictureModal({ imageUrl }: PictureModalProps) {
  // isOpen 이 true 이면 PictureModal 을 화면에 렌더링
  return (
    <div>
      <img src={imageUrl} alt="Picture" width={100} height={100} />
    </div>
  );
}
