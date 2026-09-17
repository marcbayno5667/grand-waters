export type SnackbarType = "success" | "warning" | "error";

export interface SnackbarProps {
  open: boolean;
  type: SnackbarType;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  onClose?: () => void;
  duration?: number;
}
