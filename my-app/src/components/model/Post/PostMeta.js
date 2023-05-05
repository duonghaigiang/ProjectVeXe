import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

PostMeta.propTypes = {};
const PostMetaStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 18px;
  font-weight: 600;
  color: #fff;
  font-style: italic;
  margin-top: auto;
  .time {
  }
  .dot {
    display: inline-block;
    width: 4px;
    height: 4px;
    background-color: currentColor;
    border-radius: 100rem;
  }
  .author {
  }
`;
function PostMeta({ date, children }) {
  return (
    <PostMetaStyled>
      <span className="post-time">{date}</span>
      <span className="post-dot"></span>
      <span className="post-author">{children}</span>
    </PostMetaStyled>
  );
}

export default PostMeta;
