import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

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
          <div className="mt-4 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
            >
              닫기
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
