import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
PostTitle.propTypes = {};
const PostTitleStyled = styled.h2`
  font-weight: 600;
  line-height: 2;
`;
function PostTitle({ children }) {
  return <PostTitleStyled>{children}</PostTitleStyled>;
}

export default PostTitle;
