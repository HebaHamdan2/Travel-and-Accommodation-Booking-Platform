import { CartItem } from "../../../features/types";

export interface UserDetailsFormValues {
  fullName: string;
  email: string;
  paymentMethod: string;
  cardNumber?: string;
  cardExpiry?: string;
  cardCvv?: string;
  specialRequests?: string;
}

export interface UserDetailsFormProps {
  onValidSubmit: (values: UserDetailsFormValues) => void;
}
export interface BookingConfirmationProps {
  customerDetails: {
    fullName: string;
    email: string;
    paymentMethod: string;
    specialRequests?: string;
  };
  items:CartItem[];
  onReset: () => void;
}