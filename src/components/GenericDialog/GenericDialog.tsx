import { GenericDialogProps } from "./types";
import DeleteDialog from "./variants/DeleteDialog";
import FormDialog from "./variants/FormDialog";
import SuccessDialog from "./variants/SuccessDialog";
import WarningDialog from "./variants/WarningDialog";

const GenericDialog = <T extends object>({
  open,
  onClose,
  variant,
  title,
  message,
  initialValues,
  validationSchema,
  onSubmit,
  onConfirm,
  renderForm,
  confirmText,
}: GenericDialogProps<T>) => {
  switch (variant) {
    case "delete":
      return (
        <DeleteDialog
          open={open}
          onClose={onClose}
          onConfirm={onConfirm!}
          confirmText={confirmText}
          title={title || "Confirm Delete"}
        />
      );
    case "warning":
      return (
        <WarningDialog
          open={open}
          onClose={onClose}
          onConfirm={onConfirm!}
          confirmText={confirmText}
          title={title || "Warning"}
          message={message}
        />
      );
    case "success":
      return (
        <SuccessDialog
          open={open}
          onClose={onClose}
          confirmText={confirmText}
          title={title}
          message={message}
        />
      );
    case "add":
    case "update":
      return (
        <FormDialog
          open={open}
          title={title || (variant === "add" ? "Add Item" : "Update Item")}
          variant={variant}
          initialValues={initialValues!}
          validationSchema={validationSchema}
          onClose={onClose}
          onSubmit={onSubmit!}
          renderForm={renderForm}
        />
      );
    default:
      return null;
  }
};
export default GenericDialog;
