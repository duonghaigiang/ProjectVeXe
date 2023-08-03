import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import * as yup from "yup";
import Btn from "../../components/button/btn";
import Container_form from "../../components/containerFrom/ContainerFrom";
import { useAuth } from "../../components/context/auth/authContext";
import Field from "../../components/field/Field";
import Input from "../../components/input/Input";
import InputPassword from "./../../components/input/InputPassword";
import { css } from "styled-components";
import { Spin } from "antd";

LoginPages.propTypes = {};
const Wrapper = styled.div`
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
  .btn_footer {
    flex-direction: column;
    display: flex;
    align-items: center;
  }

  .btn_footer__item {
    width: 65%;
    border: 1px solid #fff;
  }
  .btn_footer__title {
    width: 35%;
    font-size: 18px;
    color: ${(props) => props.theme.primary};
    margin-left: 4px;
  }
`;
function LoginPages(props) {
  const schema = yup.object({
    email: yup
      .string()
      .email("please enter valid email")
      .required("please enter your email"),
    password: yup
      .string()
      .min(5, "password must be least 6 character")
      .required("please enter your password"),
  });
  const navi = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: { onchange }, resolver: yupResolver(schema) });
  const { user, setUser, setToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const handleOnSubmit = async (value) => {
    try {
      const res = await axios({
        method: "POST",
        url: `http://localhost:7000/api/v1/user/login`,
        data: { ...value },
      });
      console.log(res.data);
      if (res.data !== "Sai mật khẩu !" && res.data !== "Email khong ton tai") {
        toast.success("Đăng nhập thành công !", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1000,
          hideProgressBar: true,
          closeButton: false,
          toastId: "success-toast",
          bodyClassName: css`
            text-align: center;
          `,
        });
        // document.cookie = `token = ${res.data.token}`;
        localStorage.setItem("token", `${res.data.token}`);
        setToken(localStorage.getItem("token"));
        navi("/");
        setUser(user);
        return res.data;
      } else {
        toast.error(res.data);
      }
    } catch (error) {
      toast.error("Error !!");
      return null;
    } finally {
      setLoading(false);
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
    <Wrapper>
      {loading ? (
        <Spin tip="Loading" size="small">
          <Container_form text="Đăng nhập">
            <div>
              <form className="form" onSubmit={handleSubmit(handleOnSubmit)}>
                <Field>
                  <label htmlFor="email" style={{ cursor: "pointer" }}>
                    Email
                  </label>
                  <Input
                    type="text"
                    placeholder="input your email"
                    name="email"
                    control={control}
                  ></Input>
                </Field>
                <Field>
                  <label htmlFor="password" style={{ cursor: "pointer" }}>
                    Password
                  </label>
                  <InputPassword
                    type="password"
                    placeholder="input your password"
                    name="password"
                    control={control}
                  ></InputPassword>
                </Field>
                <div className="btn_footer">
                  <Btn type="submit" className="btn_footer__item">
                    Đăng nhập
                  </Btn>
                  <NavLink to={"/registerPage"} className="btn_footer__title">
                    Bạn chưa có tài khoản !
                  </NavLink>
                </div>
              </form>
            </div>
          </Container_form>
        </Spin>
      ) : (
        <Container_form text="Đăng nhập">
          <div>
            <form className="form" onSubmit={handleSubmit(handleOnSubmit)}>
              <Field>
                <label htmlFor="email" style={{ cursor: "pointer" }}>
                  Email
                </label>
                <Input
                  type="text"
                  placeholder="input your email"
                  name="email"
                  control={control}
                ></Input>
              </Field>
              <Field>
                <label htmlFor="password" style={{ cursor: "pointer" }}>
                  Password
                </label>
                <InputPassword
                  type="password"
                  placeholder="input your password"
                  name="password"
                  control={control}
                ></InputPassword>
              </Field>
              <div className="btn_footer">
                <Btn type="submit" className="btn_footer__item">
                  Đăng nhập
                </Btn>
                <div className="btn_footer__item1">
                  <NavLink to={"/registerPage"} className="btn_footer__title">
                    Bạn chưa có tài khoản !
                  </NavLink>
                  <NavLink to={"/forgetPage"} className="btn_footer__title">
                    Quên Mật Khẩu !
                  </NavLink>
                </div>
              </div>
            </form>
          </div>
        </Container_form>
      )}
    </Wrapper>
  );
}

export default LoginPages;
