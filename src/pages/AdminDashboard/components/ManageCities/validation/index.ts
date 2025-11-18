import * as Yup from "yup";
export const CitySchema = Yup.object({
  name: Yup.string().required("City name is required"),
  description: Yup.string().required("Description is required"),
});
