import React, { lazy } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

PostImg.propTypes = {};
const PostImgStyle = styled.div`
  .img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: inherit;
  }
`;
function PostImg({ classNameimg, url, alt, classNameWrapper }) {
  return (
    <PostImgStyle className={classNameWrapper}>
      <img className={classNameimg} src={url} alt={alt} loading="lazy" />
    </PostImgStyle>
  );
}

export default PostImg;
