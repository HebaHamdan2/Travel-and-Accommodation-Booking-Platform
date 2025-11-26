import { useRef } from "react";
import UserDetailsForm from "../components/UserDetailsForm/UserDetailsForm";
import {
  UserDetailsFormHandle,
  UserDetailsFormValues,
} from "@/pages/Checkout/types";

interface FormMockProviderProps {
  onValidSubmit: (values: UserDetailsFormValues) => void;
  initialValues?: UserDetailsFormValues;
}

const FormMockProvider = ({
  onValidSubmit,
  initialValues,
}: FormMockProviderProps) => {
  const formRef = useRef<UserDetailsFormHandle>(null);

  return (
    <>
      <UserDetailsForm
        ref={formRef}
        onValidSubmit={onValidSubmit}
        initialValues={initialValues}
      />
      <button onClick={() => formRef.current?.submitForm()}>
        TriggerSubmit
      </button>
    </>
  );
};

export default FormMockProvider;
