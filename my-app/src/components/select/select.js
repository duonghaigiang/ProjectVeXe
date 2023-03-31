import React, { useState } from "react";
import PropTypes from "prop-types";
import Btn from "./../button/btn";
import styled from "styled-components";
import { useController, useForm } from "react-hook-form";
import { useAuth } from "../context/auth/authContext";

Select.propTypes = {};
const Wrapper = styled.div``;
function Select({ name, register, items }) {
  return (
    <Wrapper>
      <select {...register(`${name}`)}>
        {items.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>
    </Wrapper>
  );
}

export default Select;
