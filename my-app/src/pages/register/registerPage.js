import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Input from "../../components/input/Input";
import styled from "styled-components";
import Container_form from "../../components/containerFrom/ContainerFrom";
import Field from "../../components/field/Field";
import { useForm } from "react-hook-form";
import Btn from "./../../components/button/btn";
import InputPassword from "./../../components/input/InputPassword";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

RegisterPage.propTypes = {};
const WrapperStyled = styled.div`
  height: 100%;
  width: 100%;
  background: linear-gradient(
    to right bottom,
    rgba(0, 173, 253, 0.822),
    rgba(255, 166, 0, 0.761)
  );
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  .container {
    max-width: 1000px;
    background-color: #fff;
  }
  .form {
  }
  .WrapperForm {
    display: flex;
  }
  .btn_footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .btn_footer__item {
      width: 70%;
      border: 1px solid #fff;
    }
    .btn_footer__title {
      margin-left: 20px;
      color: ${(props) => props.theme.primary};
    }
  }
  .img {
    box-shadow: 5px 10px #000;
  }
`;
function RegisterPage(props) {
  const schema = yup.object({
    name: yup.string().required("please enter your fullname"),
    email: yup
      .string()
      .email("please enter valid email")
      .required("please enter your email"),
    password: yup
      .string()
      .min(5, "password must be least 6 character")
      .required("please enter your password"),
    numberPhone: yup
      .string()
      .min(8, "password must be least 9 character")
      .required("please enter your numberPhone"),
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const navi = useNavigate();

  const handelSubmit = async (value) => {
    console.log("SussCess value", value);
    try {
      const res = await axios({
        method: "POST",
        url: `http://localhost:7000/api/v1/user/register`,
        data: { ...value },
      });
      console.log(" suscess data ", res.data);
      toast.success("register Sucessfully");
      navi("/loginPage");
      return res.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  useEffect(() => {
    const ListErrors = Object.values(errors);
    console.log("error", ListErrors);
    if (ListErrors.length > 0) {
      ListErrors.map((error) => toast.error(error.message), {
        pauseOnHover: false,
        delay: 0,
      });
    }
  }, [errors]);
  return (
    <WrapperStyled>
      <Container_form text="Đăng kí tài khoản">
        <div className="WrapperForm">
          <form className="form" onSubmit={handleSubmit(handelSubmit)}>
            <Field>
              <label> Nhập tên của bạn</label>
              <Input
                type="text"
                placeholder="input your full name"
                name="name"
                control={control}
              ></Input>
            </Field>
            <Field>
              <label> Nhập email của bạn</label>
              <Input
                type="email"
                placeholder="input your email"
                name="email"
                control={control}
              ></Input>
            </Field>
            <Field>
              <label> Nhập số điện thoại của bạn</label>
              <Input
                type="tel"
                placeholder="input your phone"
                name="numberPhone"
                control={control}
              ></Input>
            </Field>
            <Field>
              <label> Nhập mật khẩu của bạn</label>
              <InputPassword
                type="password"
                placeholder="input your password"
                name="password"
                control={control}
              ></InputPassword>
            </Field>

            <div className="btn_footer">
              <Btn type="submit" className="btn_footer__item">
                Đăng kí
              </Btn>
              <NavLink to="/loginPage" className="btn_footer__title">
                Bạn đã có tài khoản !!
              </NavLink>
            </div>
          </form>
          <div>
            <img src="./poster__car2.jpg" className="img"></img>
          </div>
        </div>
      </Container_form>
    </WrapperStyled>
  );
}

export default RegisterPage;
