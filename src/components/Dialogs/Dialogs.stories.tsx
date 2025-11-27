import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Box, Button } from "@mui/material";

import DeleteDialog from "./DeleteDialog";
import FormDialog from "./FormDialog";
import SuccessDialog from "./SuccessDialog";
import WarningDialog from "./WarningDialog";

import * as Yup from "yup";
import { AppProviders } from "@/providers/AppProviders";
import { MemoryRouter } from "react-router-dom";
import { useFormik } from "formik";

const withProviders = (Story: any) => (
  <AppProviders>
    <MemoryRouter>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 4,
          backgroundColor: "background.default",
          minHeight: "100vh",
        }}
      >
        <Story />
      </Box>
    </MemoryRouter>
  </AppProviders>
);

const meta: Meta = {
  title: "Components/Dialogs",
  decorators: [withProviders],
};
export default meta;

export const DeleteDialogStory: StoryObj = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <Box>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Open Delete Dialog
        </Button>
        <DeleteDialog
          open={open}
          onClose={() => setOpen(false)}
          onConfirm={() => {
            alert("Deleted!");
            setOpen(false);
          }}
        />
      </Box>
    );
  },
};
export const FormDialogStory: StoryObj = {
  render: () => {
    const [open, setOpen] = useState(false);
    const formik = useFormik({
      initialValues: { name: "" },
      validationSchema: Yup.object({
        name: Yup.string().required("Name is required"),
      }),
      onSubmit: async (values) => {
        alert(JSON.stringify(values, null, 2));
        return true;
      },
    });

    return (
      <Box>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Open Form Dialog
        </Button>

        <FormDialog
          open={open}
          variant="add"
          onClose={() => setOpen(false)}
          onSubmit={formik.handleSubmit}
          isSaveDisabled={!(formik.isValid && formik.dirty)}
        >
          <input
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter name"
            style={{ width: "100%", padding: "8px" }}
          />
          {formik.touched.name && formik.errors.name && (
            <p style={{ color: "red" }}>{formik.errors.name}</p>
          )}
        </FormDialog>
      </Box>
    );
  },
};
export const SuccessDialogStory: StoryObj = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <Box>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Open Success Dialog
        </Button>
        <SuccessDialog open={open} onClose={() => setOpen(false)} />
      </Box>
    );
  },
};
export const WarningDialogStory: StoryObj = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <Box>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Open Warning Dialog
        </Button>
        <WarningDialog
          open={open}
          message="This action cannot be undone."
          onClose={() => setOpen(false)}
          onConfirm={() => {
            alert("Confirmed!");
            setOpen(false);
          }}
        />
      </Box>
    );
  },
};
