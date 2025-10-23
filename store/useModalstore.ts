import { ModalData } from "@/types";
import { create } from "zustand/react";

interface ModalStore {
  modalData: ModalData | null;
  setModalData: (data: ModalData | null) => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  modalData: null,
  setModalData: (data: ModalData | null) => set({ modalData: data }),
}));
