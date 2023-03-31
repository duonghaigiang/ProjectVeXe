import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

Container_form.propTypes = {};
const SignUpPage = styled.div`
  min-height: 100vh;
  padding: 40px;
  .img {
    width: 300px;
    height: 90%;
  }
  .logo {
    margin: 0 auto;
    width: 100px;
  }
  .heading {
    text-align: center;
    color: ${(props) => props.theme.primary};
    font-weight: bold;
  }

  .form {
    max-width: 600px;
    margin: 0 auto;
  }
`;
function Container_form({ text, children }) {
  return (
    <SignUpPage>
      <div className="container">
        <img srcSet="/logo.webp" alt="" className="logo" />
        <h1 className="heading">{text}</h1>
        {children}
      </div>
    </SignUpPage>
  );
}

export default Container_form;
