import { BookingResponse } from "@/types";
import {  CartItem } from "../../../features/types";
export interface SelectionsProps {
  cartItem: CartItem;
}
export interface UserDetailsFormValues {
  fullName: string;
  email: string;
  paymentMethod: string;
  cardNumber?: string;
  cardExpiry?: string;
  cardCvv?: string;
  specialRequests?: string;
}
export interface UserDetailsFormHandle {
  submitForm: () => void;
}
export interface UserDetailsFormProps {
  onValidSubmit: (values: UserDetailsFormValues) => void;
  initialValues?: UserDetailsFormValues;
}

export interface BookingConfirmationProps {
  customerDetails: UserDetailsFormValues;
  bookings: BookingResponse[];
  onReset: () => void;
}
