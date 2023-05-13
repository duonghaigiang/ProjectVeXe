import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

IconUSer.propTypes = {};
const Styled = styled.div`
  .icon {
    margin-right: 2px;
    fill: ${(props) => props.theme.primary};
    margin-top: 2px;
    width: 1em;
    height: 1em;
    vertical-align: -0.125em;
  }
`;
function IconUSer(props) {
  return (
    <Styled>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
        class="icon"
      >
        <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
      </svg>
    </Styled>
  );
}

export default IconUSer;
