import GenericTextField from "@/components/GenericTextField/GenericTextField";
import { Stack } from "@mui/material";

export const mockRenderForm = (formik: any) => (
  <Stack style={{ gap: 4 }}>
    <GenericTextField
      label="Name"
      name="name"
      value={formik.values.name}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
    />
    {formik.errors.name && <p style={{ color: "red" }}>{formik.errors.name}</p>}
  </Stack>
);
