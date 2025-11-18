import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { Formik, Form, FormikProps } from "formik";
import { FormDialogVariantProps } from "../types";

const FormDialog = <T extends object>({
  open,
  title,
  variant,
  initialValues,
  validationSchema,
  onClose,
  onSubmit,
  renderForm,
}: FormDialogVariantProps<T>) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      disablePortal={false}
      disableRestoreFocus
      disableEnforceFocus
    >
      <DialogTitle>{title}</DialogTitle>

      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, helpers) => {
          const ok = await onSubmit(values, helpers);
          if (ok) onClose();
        }}
      >
        {(formik: FormikProps<T>) => (
          <Form>
            <DialogContent dividers>
              {renderForm ? renderForm(formik) : null}
            </DialogContent>

            <DialogActions>
              <Button onClick={onClose}>Cancel</Button>

              <Button
                type="submit"
                variant="contained"
                disabled={!(formik.isValid && formik.dirty)}
              >
                {variant === "add" ? "Add" : "Update"}
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};
export default FormDialog;
