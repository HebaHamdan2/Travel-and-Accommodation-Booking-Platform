import { GenericDialogProps } from "./types";
import DeleteDialog from "./variants/DeleteDialog";
import FormDialog from "./variants/FormDialog";
const GenericDialog = <T extends object>({
  open,
  onClose,
  variant,
  title,
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
