import React from "react";
import { AddRoomSchema } from "../../validation";
import { RoomBodyRequest } from "../../../../../../types";
import { UpdateRoomProps } from "../../types";
import FormDialog from "@/components/Dialogs/FormDialog";
import CommonTextField from "@/components/TextField/CommonTextField";
import { useFormik } from "formik";
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
      formik.resetForm();
    }
    return ok;
  };
  const formik = useFormik({
    initialValues,
    validationSchema: AddRoomSchema,
    onSubmit: handleSubmit,
  });
  return (
    <FormDialog
      open={open}
      onClose={onClose}
      variant="update"
      isSaveDisabled={!(formik.isValid && formik.dirty)}
      onSubmit={formik.handleSubmit}
    >
      <CommonTextField
        name="roomNumber"
        label="Room Number"
        value={formik.values.roomNumber}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.roomNumber && !!formik.errors.roomNumber}
        helperText={
          (formik.touched.roomNumber && formik.errors.roomNumber) || undefined
        }
      />
      <CommonTextField
        name="cost"
        label="Cost"
        type="number"
        value={formik.values.cost}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.cost && !!formik.errors.cost}
        helperText={(formik.touched.cost && formik.errors.cost) || undefined}
      />
    </FormDialog>
  );
};

export default UpdateRoomDialog;
