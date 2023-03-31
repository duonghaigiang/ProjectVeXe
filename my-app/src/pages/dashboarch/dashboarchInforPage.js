import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useAuth } from "../../components/context/auth/authContext";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import Field from "../../components/field/Field";
import Input from "../../components/input/Input";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import InputPassword from "../../components/input/InputPassword";
import Btn from "../../components/button/btn";
import axios from "axios";
import { toast } from "react-toastify";

DashboarchPage.propTypes = {};
const DashboarchPageStyle = styled.div`
  .dashboard_infor {
    margin-left: 20px;
    margin-top: 12px;
  }
  .form {
    margin-top: 40px;
    width: 400px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .dashboard_password {
    margin-left: 20px;
    display: flex;
    .dashboard_password_change {
      margin-left: 12px;
      color: ${(props) => props.theme.primary};
    }
  }
  .dashboard_footer {
    display: flex;
    justify-content: flex-end;
  }
  .btn {
    padding: 15px 10px;
    width: 600px;
  }
  .input {
    width: 600px;
  }
`;
function DashboarchPage(props) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [clickChangePassword, setClickChangePassword] = useState(false);
  const { user } = useAuth();
  const handleClickChangePassword = () => {
    setClickChangePassword(!clickChangePassword);
    setClickChangeAvatar(false);
  };
  const [clickChangeAvatar, setClickChangeAvatar] = useState(false);
  const handleClickChangeAvatar = () => {
    setClickChangeAvatar(!clickChangeAvatar);
    setClickChangePassword(false);
  };
  const schema = yup.object({
    password: yup
      .string()
      .min(5, "password must be least 6 character")
      .required("please enter your password"),
    newpassword: yup
      .string()
      .min(5, "password must be least 6 character")
      .required("please enter your newpassword"),
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const form1 = useForm({
    mode: "onChange",
  });
  const handleSubmitFormChangePassword = async (value) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios({
        method: "PUT",
        url: "http://localhost:7000/api/v1/user/user",
        data: { ...value },
        headers: {
          token: `${token}`,
        },
      });
      if (res) {
        toast.success(res.data);
        return res.data;
      } else {
        toast.error(res.data);
      }
    } catch (error) {
      toast.error("sai mật khẩu");
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
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    console.log("change");
  };
  const handleSubmitAvatar = async (event) => {
    try {
      const token = localStorage.getItem("token");
      let formData = new FormData();
      formData.append("avatar", selectedFile);
      const res = await axios({
        method: "POST",
        url: "http://localhost:7000/api/v1/user/upload_img",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          token: `${token}`,
        },
      });
      console.log(res.data);
      if (res.data && res.data != "file ko nhập đc") {
        toast.success(res.data);
      } else if (res.data == "file ko nhập đc") {
        toast.error(res.data);
      } else {
        toast.error("error");
      }
    } catch (error) {
      toast.error("error ");
    }
  };
  return (
    <DashboarchPageStyle>
      <div className="dashboard_infor">
        {" "}
        <div>Email : {user.email}</div>
        <div>Name : {user.name}</div>
        <div>Số điện thoại : {user.numberPhone}</div>
      </div>
      <div className="dashboard_password">
        <div>Mật khẩu : *******</div>
        <NavLink
          className="dashboard_password_change"
          onClick={handleClickChangePassword}
        >
          Thay đổi mật khẩu{" "}
        </NavLink>
        <div>Upload Avatar !</div>
        <NavLink
          className="dashboard_password_change"
          onClick={handleClickChangeAvatar}
        >
          Nhập Avatar
        </NavLink>
      </div>
      {clickChangePassword ? (
        <form
          action="/update-profile"
          method="post"
          className="form"
          onSubmit={handleSubmit(handleSubmitFormChangePassword)}
        >
          <Field>
            <label>Nhập mật khẩu hiện tại</label>
            <InputPassword
              className="input"
              type="password"
              placeholder="INPUT CURRENT PASSWORD"
              name="password"
              control={control}
            ></InputPassword>
          </Field>
          <Field>
            <label>Nhập mật khẩu mới</label>
            <InputPassword
              className="input"
              type="password"
              placeholder="INPUT NEW PASSWORD"
              name="newpassword"
              control={control}
            ></InputPassword>
          </Field>
          <div className="dashboard_footer">
            <Btn onClick={handleClickChangePassword} className="btn">
              Hủy bỏ{" "}
            </Btn>{" "}
            <Btn type="submit" className="btn">
              Thay đổi mật khẩu
            </Btn>
          </div>
        </form>
      ) : (
        ""
      )}
      {clickChangeAvatar ? (
        <form
          method="post"
          enctype="multipart/form-data"
          onSubmit={form1.handleSubmit(handleSubmitAvatar)}
        >
          <input
            id="avatar"
            type="file"
            name="avatar"
            control={control}
            onChange={handleFileChange}
          />
          <Btn type="submit"> upload</Btn>
        </form>
      ) : (
        ""
      )}
    </DashboarchPageStyle>
  );
}

export default DashboarchPage;
