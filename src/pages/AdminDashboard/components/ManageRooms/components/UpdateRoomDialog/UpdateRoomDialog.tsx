import React from "react";
import { AddRoomSchema } from "../../validation";
import { RoomBodyRequest } from "../../../../../../types";
import { UpdateRoomProps } from "../../types";
import GenericDialog from "@/components/GenericDialog";
import GenericTextField from "@/components/GenericTextField/GenericTextField";
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
          <GenericTextField
            name="roomNumber"
            label="Room Number"
            value={formik.values.roomNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.roomNumber && !!formik.errors.roomNumber}
            helperText={
              (formik.touched.roomNumber && formik.errors.roomNumber) ||
              undefined
            }
          />
          <GenericTextField
            name="cost"
            label="Cost"
            type="number"
            value={formik.values.cost}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.cost && !!formik.errors.cost}
            helperText={
              (formik.touched.cost && formik.errors.cost) || undefined
            }
          />
        </>
      )}
    />
  );
};

export default UpdateRoomDialog;
