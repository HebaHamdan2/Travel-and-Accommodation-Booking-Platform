import React from "react";
import { AddRoomSchema } from "../../validation";
import { RoomBodyRequest } from "../../../../../../types";
import { AddRoomProps } from "../../types";
import GenericDialog from "@/components/GenericDialog";
import GenericTextField from "@/components/GenericTextField/GenericTextField";
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

export default AddRoomDialog;
