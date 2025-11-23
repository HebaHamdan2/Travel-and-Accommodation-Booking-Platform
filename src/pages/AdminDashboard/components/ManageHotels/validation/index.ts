import * as Yup from "yup";

export const UpdateValidationSchema = Yup.object({
  name: Yup.string().trim().required("Name is required"),
  description: Yup.string().trim().required("Description is required"),
  hotelType: Yup.number().required("Hotel Type is required"),
  starRating: Yup.number()
    .required("Star rating is required")
    .integer("Star rating must be an integer")
    .min(1, "Minimum 1 star")
    .max(5, "Maximum 5 stars"),
  latitude: Yup.number()
    .required("Latitude is required")
    .min(-90, "Latitude must be ≥ -90")
    .max(90, "Latitude must be ≤ 90"),
  longitude: Yup.number()
    .required("Longitude is required")
    .min(-180, "Longitude must be ≥ -180")
    .max(180, "Longitude must be ≤ 180"),
});
export const AddValidationSchema = Yup.object({
  name: Yup.string().trim().required("Name is required"),
  description: Yup.string().trim().required("Description is required"),
  hotelType: Yup.number()
    .required("Hotel Type is required")
    .min(0, "Select a hotel type"),
  starRating: Yup.number()
    .required("Star rating is required")
    .integer("Star rating must be an integer")
    .min(1, "Minimum 1 star")
    .max(5, "Maximum 5 stars"),
  latitude: Yup.number()
    .required("Latitude is required")
    .min(-90, "Latitude must be ≥ -90")
    .max(90, "Latitude must be ≤ 90"),
  longitude: Yup.number()
    .required("Longitude is required")
    .min(-180, "Longitude must be ≥ -180")
    .max(180, "Longitude must be ≤ 180"),
  cityId: Yup.number().required("City is required").min(0, "City is required"),
});
