import React, { useState } from "react";
import styled from "styled-components";
import { useController } from "react-hook-form";
import IconEyeClose from "../icon/IconClose";
import IconEyeOpen from "../icon/IconOpen";
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
const Wrapper = styled.div`
  position: relative;
`;
const Icon = styled.div`
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
`;
function InputPassword({ control, name, type, ...props }) {
  const { field } = useController({
    name,
    control,
    defaultValue: "",
  });
  const [checkPassword, setCheckPassword] = useState(false);
  const handleClick = () => {
    setCheckPassword(!checkPassword);
  };
  return (
    <Wrapper>
      <InputStyle
        id={name}
        type={checkPassword ? "text" : "password"}
        {...props}
        {...field}
      ></InputStyle>
      {checkPassword ? (
        <Icon>
          <IconEyeOpen onClick={handleClick}></IconEyeOpen>
        </Icon>
      ) : (
        <Icon>
          <IconEyeClose onClick={handleClick}></IconEyeClose>
        </Icon>
      )}
    </Wrapper>
  );
}

export default InputPassword;
