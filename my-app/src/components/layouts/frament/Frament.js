import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Header from "./../header/Header";

Layout.propTypes = {};

function Layout({ children }) {
  return (
    <Fragment>
      <Header></Header>
      {children}
    </Fragment>
  );
}

export default Layout;
