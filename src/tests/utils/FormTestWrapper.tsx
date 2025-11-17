import { useRef } from "react";
import UserDetailsForm from "../../pages/Checkout/components/UserDetailsForm/UserDetailsForm";
import {
  UserDetailsFormHandle,
  UserDetailsFormValues,
} from "@/pages/Checkout/types";

interface FormTestWrapperProps {
  onValidSubmit: (values: UserDetailsFormValues) => void;
  initialValues?: UserDetailsFormValues;
}

const FormTestWrapper = ({
  onValidSubmit,
  initialValues,
}: FormTestWrapperProps) => {
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

export default FormTestWrapper;
