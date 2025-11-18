import React from "react";
import { AddRoomSchema } from "../../validation";
import { RoomBodyRequest } from "../../../../../../types";
import { UpdateRoomProps } from "../../types";
import GenericDialog from "@/components/GenericDialog";
import FormikTextField from "@/components/FormikTextField";
const UpdateRoomDialog: React.FC<UpdateRoomProps> = ({
  open,
  onClose,
  selectedRoom,
  onSubmit,
}) => {
  const initialValues = {
    roomNumber: selectedRoom?.roomNumber ?? "",
    cost: selectedRoom?.cost ?? 0,
  };
  const handleSubmit = async (values: RoomBodyRequest): Promise<boolean> => {
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
      variant="update"
      title="Update Room"
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

export default UpdateRoomDialog;
