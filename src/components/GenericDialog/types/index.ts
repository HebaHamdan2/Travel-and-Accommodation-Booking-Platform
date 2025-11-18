import { FormikHelpers, FormikProps } from "formik";

export type DialogVariant = "add" | "update" | "delete";

export interface GenericDialogProps<T extends object> {
  open: boolean;
  onClose: () => void;
  variant: DialogVariant;
  title?: string;
  initialValues?: T; // For add/update
  validationSchema?: any; // Yup schema
  onSubmit?: (values: T, helpers: FormikHelpers<T>) => Promise<boolean>;
  onConfirm?: () => void; // For delete
  renderForm?: (formikProps: FormikProps<T>) => React.ReactNode; 
  confirmText?: string;
}
export interface DeleteDialogVariantProps {
  open: boolean;
  title: string;
  onClose: () => void;
  onConfirm?: () => void;
  confirmText?: string;
}
export interface FormDialogVariantProps<T extends object> {
  open: boolean;
  title: string;
  variant: "add" | "update";

  initialValues: T;
  validationSchema?: any;

  onClose: () => void;
  onSubmit: (values: T, helpers: FormikHelpers<T>) => Promise<boolean>;

  renderForm?: (formik: FormikProps<T>) => React.ReactNode;
}