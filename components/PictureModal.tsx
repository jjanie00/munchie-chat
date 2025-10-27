import { supabase } from "@/lib/supabase";
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
    // server : jpeg 변환, supabase storage 업로드
    async function blobUrlToJpeg(blobUrl: string): Promise<Blob> {
      return new Promise((resolve, reject) => {
        // Image 객체
        const img = new Image();
        img.src = blobUrl;

        // Image 로딩은 비동기, onLoad 이후 width/height 접근 O
        img.onload = () => {
          // canvas 생성
          const canvas = document.createElement("canvas");
          // canvas 크기 설정
          canvas.width = img.width;
          canvas.height = img.height;

          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0);

          // JPEG Blob 변환
          canvas.toBlob(
            // canvas.toblob api 가 자동으로 생성해 전달
            (blob) => {
              if (blob) {
                resolve(blob);
              } else {
                reject(new Error("변환 실패"));
              }
            },
            // 변환 형식
            "image/jpeg",
            // 품질
            0.9
          );
        };

        img.onerror = reject;
      });
    }
    const jpegBlobUrl = await blobUrlToJpeg(imageUrl);

    // supabase storage 업로드
    async function uploadFile(jpegBlobUrl: Blob) {
      const { data, error } = await supabase.storage
        .from("meal-images")
        .upload(`chat/${Date.now()}.jpg`, jpegBlobUrl);
      if (error) {
        console.error("업로드 실패:", error);
        return;
      } else {
        console.log("업로드 성공:", data);
      }
    }
    uploadFile(jpegBlobUrl);

    // browser : base64 변환, Zustand store 저장
    const convertedImgUrl = (await picToBase64(imageUrl)) as string;
    // 스토어에 모달 데이터 설정
    useModalStore.getState().setModalData({
      id,
      isOwn,
      imageUrl: convertedImgUrl,
      description,
      timestamp,
    });
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
          <div className="mt-4 flex gap-2 justify-end">
            <button
              className="px-4 py-2 bg-black text-white rounded-lg cursor-pointer"
              onClick={() =>
                handleRegister({
                  id: 2,
                  isOwn: true,
                  imageUrl,
                  description,
                  timestamp: new Date().toLocaleTimeString(),
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

// todo :: 아이폰 이미지 업로드
