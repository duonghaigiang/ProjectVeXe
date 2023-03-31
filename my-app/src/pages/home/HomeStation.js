import React from "react";
import PropTypes from "prop-types";
import Layout from "./../../components/layouts/frament/Frament";
import HomeBanner from "./../../components/model/home/HomeBaner";
import HomeFeature from "./../../components/model/home/HomeFeature";
import Trip from "./../trip/Trip";

HomeTrip.propTypes = {};

function HomeTrip(props) {
  return (
    <div>
      <Layout>
        <div className="container">
          <Trip></Trip>
        </div>
      </Layout>
    </div>
  );
}

export default HomeTrip;
