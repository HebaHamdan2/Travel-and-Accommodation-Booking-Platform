import React from "react";

export interface GenericTextFieldProps {
  name: string;
  label: string;
  type?: string;
  value: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: boolean;
  helperText?: string;
  icon?: React.ReactNode;
  multiline?: boolean;
  minRows?: number;
  inputProps?: any;
}
export interface GenericTextFieldStotyProps {
  name: string;
  label: string;
  value?: string;
  multiline?: boolean;
  minRows?: number;
  icon?: React.ReactNode;
  helperText?:string,
}
