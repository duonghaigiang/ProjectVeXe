import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

Btn.propTypes = {};
const BtnStyled = styled.button`
  margin-bottom: 20px;
  cursor: pointer;
  padding: 20px;
  line-height: 1;
  width: 100%;
  color: #fff;
  border-radius: 10px;
  background-image: linear-gradient(
    to right bottom,
    rgba(0, 173, 253, 0.822),
    rgba(255, 166, 0, 0.761)
  );
  background-size: cover;
  margin-top: 24px;
`;
function Btn({ children, ...props }) {
  return <BtnStyled {...props}>{children}</BtnStyled>;
}

export default Btn;
