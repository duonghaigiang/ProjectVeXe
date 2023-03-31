import React from "react";
import PropTypes from "prop-types";
import Heading from "./../../heading/Heading";
import PostFeatureItem from "./../Post/PostFeatureItem";
HomeFeature.propTypes = {};
function HomeFeature(props) {
  const today = new Date();
  const date = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const curentdate = `${date}/${month}/${year}`;
  return (
    <div className="home-bock">
      <div className="container">
        <Heading> Tuyến đường phổ biến</Heading>
        <div className="gird-layout">
          <PostFeatureItem
            date={curentdate}
            title="Sài gòn - Đà Lạt"
            province="từ 150000đ"
          ></PostFeatureItem>
          <PostFeatureItem
            date={curentdate}
            title="Sài gòn - Nha Trang"
            province="từ 150000đ"
          ></PostFeatureItem>
          <PostFeatureItem
            date={curentdate}
            title="Sài gòn - Hà Nội"
            province="từ 500000"
          ></PostFeatureItem>
        </div>
      </div>
    </div>
  );
}

export default HomeFeature;
