import React, { useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Container_form from "./../../components/containerFrom/ContainerFrom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import Field from "./../../components/field/Field";
import Input from "./../../components/input/Input";
import Btn from "../../components/button/btn";
import axios from "axios";
import { NavLink } from "react-router-dom";
Forget.propTypes = {};
const Styled = styled.div`
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
  .btn_footer__title {
    width: 35%;
    font-size: 18px;
    color: ${(props) => props.theme.primary};
    margin-left: 4px;
  }
`;
function Forget(props) {
  const schema = yup.object({
    gmail: yup
      .string()
      .email("please enter valid email")
      .required("please enter your email"),
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
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
  const handelSubmit = async (value) => {
    try {
      const res = await axios({
        method: "POST",
        url: "http://localhost:7000/api/v1/user/forget",
        data: { ...value },
      });
      console.log("D", value);
      if (res) {
        toast.success(res.data);
      } else {
        toast.error("lỗi");
      }
    } catch (error) {
      toast.error("lỗi");
    }
  };
  return (
    <Styled>
      <Container_form text="Quên Mật Khẩu">
        <div className="WrapperForm">
          <form className="form" onSubmit={handleSubmit(handelSubmit)}>
            <Field>
              <label> Nhập Email của bạn</label>
              <Input
                type="text"
                placeholder="input your gmail"
                name="gmail"
                control={control}
              ></Input>
            </Field>
            <Btn type="submit">Gửi Yêu Cầu</Btn>
          </form>
          <NavLink to={"/loginPage"} className="btn_footer__title">
            Đăng nhập
          </NavLink>
        </div>
      </Container_form>
    </Styled>
  );
}

export default Forget;
