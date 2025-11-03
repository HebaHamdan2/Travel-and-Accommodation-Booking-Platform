import React from "react";
import classNames from "classnames/bind";
import styles from "./Button.module.css";
import { ButtonProps } from "./types";
const cx = classNames.bind(styles);
const Button: React.FC<ButtonProps> = ({
  variant,
  size,
  color,
  children,
  onClick = () => {},
}) => {
  const btnClass = cx({
    btn: true,
    [variant]: variant,
    [color]: color,
    [size]: size,
  });
  return (
    <button type="button" onClick={onClick} className={btnClass}>
      {children}
    </button>
  );
};

export default Button;