import React from "react";
import {  Typography } from "@mui/material";
import './style.button.scss'

type ButtonProps = {
  onClick: () => void,
  title?: string
}
export const CommonButton = ({ title = '', onClick }: ButtonProps): React.ReactElement => {
  return    <button className='add-button' onClick={onClick}>
{title}
</button>
}