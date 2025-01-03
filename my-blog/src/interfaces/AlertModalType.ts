export interface BaseModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    message: string;
    footerButtons: React.ReactNode;
  }

  // 定义 AlertSuccessModal 的 props 类型
  export interface AlertSuccessModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
  }
  
  // 定义 AlertDeletionModal 的 props 类型
export interface AlertDeletionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmButtonLabel?: string; // 可选参数，默认为 "删除"
    cancelButtonLabel?: string; // 可选参数，默认为 "取消"
  }