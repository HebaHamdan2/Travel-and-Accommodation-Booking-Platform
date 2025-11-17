import { Box } from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import FormikTextField from "../FormikTextField";
import { FormikTextFieldStoryProps } from "@/components/InfoCard/types";
export default function FormikTextFieldStory(props: FormikTextFieldStoryProps) {
  const { name } = props;

  return (
    <Formik
      initialValues={{ [name]: "" }}
      validationSchema={Yup.object({
        [name]: Yup.string().required("Required"),
      })}
      onSubmit={() => {}}
    >
      {(formik) => (
        <Box width={400}>
          <FormikTextField {...props} formik={formik} />
        </Box>
      )}
    </Formik>
  );
}
