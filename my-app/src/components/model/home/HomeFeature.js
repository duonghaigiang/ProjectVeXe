import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Heading from "./../../heading/Heading";
import PostFeatureItem from "./../Post/PostFeatureItem";
import axios from "axios";
import styled from "styled-components";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth/authContext";
import queryString from "query-string";

HomeFeature.propTypes = {};
const Styled = styled.div`
  cursor: pointer;
`;
function HomeFeature(props) {
  const today = new Date();
  const date = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const curentdate = `${date}/${month}/${year}`;
  const { setTrip } = useAuth();
  const [posts, setPosts] = useState([]);
  const navi = useNavigate();
  const post = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: "http://localhost:7000/api/v1/posts/get",
      });
      if (res) {
        setPosts(res.data);
      } else {
        console.log(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    post();
  }, []);
  const handleClick = async (id) => {
    const item = posts.find((item) => {
      return item.id === id;
    });
    if (item.trip) {
      const params = { province: item.trip };
      const search = queryString.stringify(params);
      navi(`/?${search}`);
      const res = await axios({
        method: "GET",
        url: `http://localhost:7000/api/v1/stations/?${search}`,
      });
      if (res) {
        setTrip(res.data);
        console.log(res.data);
        navi("/trip");
      } else {
        toast.error("error!");
      }
    } else {
      toast.error("error!");
    }
  };
  return (
    <Styled className="home-bock">
      <div className="container">
        <Heading> Tuyến đường phổ biến</Heading>
        <div className="gird-layout">
          {posts.length > 0
            ? posts.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    handleClick(item.id);
                  }}
                >
                  <PostFeatureItem
                    date={curentdate}
                    title={item.trip}
                    province={item.price}
                  ></PostFeatureItem>
                </div>
              ))
            : ""}
        </div>
      </div>
    </Styled>
  );
}

export default HomeFeature;

{
  /* <PostFeatureItem
date={curentdate}
title="Sài gòn - Đà Lạt"
province="từ 150000đ"
></PostFeatureItem> */
}
