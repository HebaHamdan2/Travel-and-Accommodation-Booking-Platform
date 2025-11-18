import { FormikProps } from "formik";

export interface FormikTextFieldProps<T> {
  name: string;
  label: string;
  type?: string;
  icon?: React.ReactNode;
  formik: FormikProps<T>;
  multiline?: boolean;
  minRows?: number;
  inputProps?: any;
}
export type FormikTextFieldStoryProps = Omit<
  FormikTextFieldProps<any>,
  "formik"
>;