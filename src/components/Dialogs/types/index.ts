import React from "react";

export interface DeleteDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}
export interface SuccessDialogProps {
  open: boolean;
  onClose: () => void;
}
export interface WarningDialogProps {
  open: boolean;
  message: string;
  onConfirm: () => void;
  onClose: () => void;
}
export interface FormDialogProps {
  open: boolean;
  variant: "add" | "update";
  onClose: () => void;
  children: React.ReactNode;
  isSaveDisabled: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}
