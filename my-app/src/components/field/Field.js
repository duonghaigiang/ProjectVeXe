import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

Field.propTypes = {};
const FielStyled = styled.div`
  width: 600px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  margin-top: 10px;
`;
function Field({ children }) {
  return <FielStyled>{children}</FielStyled>;
}

export default Field;
