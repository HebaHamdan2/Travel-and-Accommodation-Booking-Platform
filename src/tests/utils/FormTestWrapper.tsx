import { useRef } from "react";
import UserDetailsForm from "../../pages/Checkout/components/UserDetailsForm/UserDetailsForm";
import {
  UserDetailsFormHandle,
  UserDetailsFormValues,
} from "@/pages/Checkout/types";
import { AppProviders } from "@/providers/AppProviders";

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
      <AppProviders>
        <UserDetailsForm
          ref={formRef}
          onValidSubmit={onValidSubmit}
          initialValues={initialValues}
        />
        <button onClick={() => formRef.current?.submitForm()}>
          TriggerSubmit
        </button>
      </AppProviders>
    </>
  );
};

export default FormTestWrapper;
