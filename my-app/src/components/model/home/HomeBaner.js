import axios from "axios";
import queryString from "query-string";
import React from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../../context/auth/authContext";
import Btn from "./../../button/btn";
import Select from "./../../select/select";
import Trip from "./../../../pages/trip/Trip";

HomeBanner.propTypes = {};
const HomeBannerStyled = styled.div`
  .container {
    background-color: none;
  }
  min-height: 520px;
  width: 100%;
  /* width: 100vw; */
  height: 100vh;
  background-image: linear-gradient(
    to right bottom,
    ${(props) => props.theme.primary},
    rgba(255, 166, 0, 0.761)
  );
  background-size: cover;
  padding: 40px 0;
  .banner {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .banner__content {
    max-width: 600px;
  }
  .banner__content-heading {
    font-size: 36px;
    margin-bottom: 20px;
  }
  .banner__content-description {
    line-height: 1.75;
    margin-bottom: 40px;
  }
  .btn {
    border-radius: 16px;
    border: 1px solid #fff;
  }
  .form {
    display: flex;
  }
`;
function HomeBanner(props) {
  const { Station, setTrip } = useAuth();
  const navi = useNavigate();
  const { register, handleSubmit } = useForm();
  const location = useLocation();
  const matchPath = "/api/v1/stations/";
  const onSubmit = async (data) => {
    try {
      const params = { address: data.address, province: data.province };
      const search = queryString.stringify(params);

      navi(`/?${search}`);
      const res = await axios({
        method: "GET",
        url: `http://localhost:7000/api/v1/stations/?${search}`,
        token: {
          token: localStorage.getItem("token"),
        },
      });
      if (res) {
        console.log(res.data);
        setTrip(res.data);
        navi("/trip");
        return res.data;
      }
      console.log("error");
    } catch (error) {
      console.log("error");
    }
  };
  return (
    <HomeBannerStyled>
      <div className="container">
        <div className="banner">
          <div className="banner__content">
            <div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form">
                  <div>
                    <label>address</label>
                    <Select
                      name="address"
                      register={register}
                      items={Station}
                    ></Select>
                  </div>
                  <div>
                    <label>province</label>
                    <Select
                      name="province"
                      register={register}
                      items={Station}
                    ></Select>
                  </div>
                </div>
                <Btn type="submit" className="btn">
                  Get Stated
                </Btn>
              </form>
            </div>
          </div>
          <div className="banner__img">
            <img src="./img-banner.png" alt="image" />
          </div>
        </div>
      </div>
    </HomeBannerStyled>
  );
}

export default HomeBanner;
