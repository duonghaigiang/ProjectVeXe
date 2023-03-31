import React, { useState } from "react";
import styled from "styled-components";
import { useController } from "react-hook-form";
const InputStyle = styled.input`
  border: 1px solid #000;
  padding: 8px;
  border-radius: 8px;
  width: 100%;
  :focus {
    border: 2px solid ${(props) => props.theme.primary};
    transition: all 0.2s;
  }
`;
function Input({ value, control, name, ...props }) {
  const { field } = useController({
    name,
    control,
  });
  return <InputStyle id={name} {...props} {...field}></InputStyle>;
}

export default Input;
