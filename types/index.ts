export type ModalData = {
  id: number;
  isOwn: boolean;
  imageUrl: string;
  description?: string;
  timestamp: string;
};

export type Message = {
  id: number;
  imageUrl?: string; // 임시 옵셔널 체이닝
  description?: string;
  isOwn: boolean;
  timestamp: string;
};
