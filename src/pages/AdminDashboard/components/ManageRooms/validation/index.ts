import * as Yup from "yup";

export const roomSchema = Yup.object({
  roomNumber: Yup.number()
    .integer("Must be integer")
    .required("Room number is required"),
  roomPhotoUrl: Yup.string().url("Invalid URL").nullable(),
  roomType: Yup.string().required("Room type is required"),
  capacityOfAdults: Yup.number()
    .integer()
    .min(1, "At least 1 adult")
    .required("Required"),
  capacityOfChildren: Yup.number().integer().min(0).required("Required"),
  price: Yup.number().min(0, "Must be >= 0").required("Price is required"),
  availability: Yup.boolean().required(),
});
export const AddRoomSchema = Yup.object({
  roomNumber: Yup.string()
    .trim()
    .required("Room number is required"),

  cost: Yup.number()
    .required("Cost is required")
    .min(1, "Cost must be greater than 0"),
});
