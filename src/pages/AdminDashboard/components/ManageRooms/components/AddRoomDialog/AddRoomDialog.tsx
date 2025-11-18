import React from "react";
import { AddRoomSchema } from "../../validation";
import { RoomBodyRequest } from "../../../../../../types";
import { AddRoomProps } from "../../types";
import GenericDialog from "@/components/GenericDialog";
import FormikTextField from "@/components/FormikTextField";
const AddRoomDialog: React.FC<AddRoomProps> = ({ open, onClose, onSubmit }) => {
  const initialValues = { roomNumber: "", cost: 0 };
  const handleSubmit = async (values: RoomBodyRequest) => {
    const ok = await onSubmit({
      roomNumber: values.roomNumber,
      cost: Number(values.cost),
    });
    if (ok) {
      onClose();
    }
    return ok;
  };
  return (
    <GenericDialog<typeof initialValues>
      open={open}
      onClose={onClose}
      variant="add"
      title="Add Room"
      initialValues={initialValues}
      validationSchema={AddRoomSchema}
      onSubmit={handleSubmit}
      renderForm={(formik) => (
        <>
          <FormikTextField
            name="roomNumber"
            label="Room Number"
            formik={formik}
          />
          <FormikTextField
            name="cost"
            label="Cost"
            type="number"
            formik={formik}
          />
        </>
      )}
    />
  );
};

export default AddRoomDialog;
