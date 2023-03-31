import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
PostCaterory.propTypes = {};
const PostcateroryStyled = styled.span`
  display: inline-block;
  padding: 8px 12px;
  border-radius: 8px;
  color: #6b6b6b;
  font-size: 14px;
  font-weight: 600;
  white-space: nowrap;
  background-color: #f3f3f3;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100px;
  cursor: pointer;
`;
function PostCaterory({ children }) {
  return <PostcateroryStyled>{children}</PostcateroryStyled>;
}

export default PostCaterory;
