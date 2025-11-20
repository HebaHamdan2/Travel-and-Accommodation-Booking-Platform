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
  const getTitle = () => {
    if (title) return title;
    switch (variant) {
      case "add":
        return "Add Item";
      case "update":
        return "Update Item";
      case "delete":
        return "Confirm Delete";
      case "warning":
        return "Warning";
      case "success":
        return "Success";
    }
  };

  if (variant === "delete") {
    return (
      <DeleteDialog
        open={open}
        onClose={onClose}
        onConfirm={onConfirm}
        confirmText={confirmText}
        title={getTitle()}
      />
    );
  }
  if (variant === "warning") {
    return (
      <WarningDialog
        open={open}
        onClose={onClose}
        onConfirm={onConfirm!}
        title={getTitle()}
        confirmText={confirmText}
        message={message}
      />
    );
  }
  if (variant === "success") {
    return (
      <SuccessDialog
        open={open}
        onClose={onClose}
        title={getTitle()}
        message={message}
        confirmText={confirmText}
      />
    );
  }
  // Add / Update variants
  return (
    <FormDialog
      open={open}
      title={getTitle()}
      variant={variant}
      initialValues={initialValues!}
      validationSchema={validationSchema}
      onClose={onClose}
      onSubmit={onSubmit!}
      renderForm={renderForm}
    />
  );
};

export default GenericDialog;
