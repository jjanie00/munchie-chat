import { useModalStore } from "@/store/useModalstore";
import { ModalData } from "@/types";
import { picToBase64 } from "@/util";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useState } from "react";

interface PictureModalProps {
  imageUrl: string;
  isOpen: boolean;
  onClose: () => void;
}

/**
 * 촬영한 사진을 표시하는 모달 컴포넌트
 * @param {string} props.imageUrl - 촬영한 사진의 URL
 * @param {boolean} props.isOpen - 모달 열림 상태
 * @param {function} props.onClose - 모달 닫기 함수
 * @returns {JSX.Element}
 */
export default function PictureModal({
  imageUrl,
  isOpen,
  onClose,
}: PictureModalProps) {
  const [description, setDescription] = useState("");

  const handleRegister = async ({
    id,
    isOwn,
    imageUrl,
    description,
    timestamp,
  }: ModalData) => {
    // 이미지를 base64로 변환
    const convertedImgUrl = (await picToBase64(imageUrl)) as string;
    // 스토어에 모달 데이터 설정
    useModalStore.getState().setModalData({
      id,
      isOwn,
      imageUrl: convertedImgUrl,
      description,
      timestamp,
    });
    // 모달 닫기
    onClose();
  };
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-black/50" />
      {/* 포지셔닝 컨테이너 */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        {/* 실제 모달 내용 */}
        <DialogPanel className="bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-auto">
          <DialogTitle className="text-black text-xl mb-4">
            촬영한 사진
          </DialogTitle>
          <img
            src={imageUrl}
            className="w-full h-auto rounded-lg"
            alt="촬영한 사진"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full h-32 border border-gray-300 rounded-lg p-2 text-black mt-4"
          />
          <div className="mt-4 flex gap-2 justify-end">
            <button
              className="px-4 py-2 bg-black text-white rounded-lg cursor-pointer"
              onClick={() =>
                handleRegister({
                  id: 2,
                  isOwn: true,
                  imageUrl,
                  description,
                  timestamp: new Date().toISOString(),
                })
              }
            >
              등록
            </button>
            <button
              onClick={onClose}
              className="cursor-pointer px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
            >
              닫기
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
