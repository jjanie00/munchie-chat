import { create } from "zustand/react";

interface ModalData {
  imageUrl: string;
  description: string;
}

interface ModalStore {
  modalData: ModalData | null;
  setModalData: (data: ModalData | null) => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  // state
  modalData: null,
  // action
  // modalData 를 받아 상태 업데이트
  setModalData: (data: ModalData | null) => set({ modalData: data }),
}));
