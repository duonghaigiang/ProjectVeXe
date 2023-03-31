import React from "react";
import PropTypes from "prop-types";
import Layout from "./../../components/layouts/frament/Frament";
import HomeBanner from "./../../components/model/home/HomeBaner";
import HomeFeature from "./../../components/model/home/HomeFeature";

Home.propTypes = {};

function Home(props) {
  return (
    <div>
      <Layout>
        <HomeBanner></HomeBanner>
        <HomeFeature></HomeFeature>
      </Layout>
    </div>
  );
}

export default Home;
