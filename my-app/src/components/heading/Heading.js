import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
const HeadingStyle = styled.h2`
  color: ${(props) => props.theme.primary};
  font-size: 28px;
  margin-top: 20px;
  position: relative;
  margin-bottom: 30px;
  display: inline-block;
  &:before {
    display: block;
    content: "";
    height: 4px;
    width: 100%;
    margin-top: 44px;
    background-image: linear-gradient(
      to right bottom,
      rgba(0, 173, 253, 0.822),
      rgba(255, 166, 0, 0.761)
    );
    background-size: cover;
    border-radius: 10px;
    position: absolute;
    top: 0;
    transform: translate(0, -150%);
    left: 0;
  }
`;
Heading.propTypes = {};

function Heading({ children }) {
  return <HeadingStyle>{children}</HeadingStyle>;
}

export default Heading;
