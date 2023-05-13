import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useAuth } from "../../components/context/auth/authContext";
import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";
import Field from "../../components/field/Field";
import Input from "../../components/input/Input";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import InputPassword from "../../components/input/InputPassword";
import Btn from "../../components/button/btn";
import axios from "axios";
import { toast } from "react-toastify";
import { Modal } from "antd";

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
  .changeMail {
    margin-left: 0px;
    color: ${(props) => props.theme.primary};
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
  .logout {
    display: inline-block;
    cursor: pointer;
    border: 2px solid ${(props) => props.theme.primary};
    border-radius: 12px;
    padding: 4px;
  }
  .avartar {
    border-radius: 12px;
    border: 2px solid ${(props) => props.theme.primary};
    margin: 24px;
    width: 150px;
    height: 30px;
    color: #000;
    cursor: pointer;
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
  const schemaInfor = yup.object({
    passwordd: yup
      .string()
      .min(5, "password must be least 6 character")
      .required("please enter your password"),
    email: yup
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

  const form1 = useForm({
    mode: "onChange",
  });
  const form2 = useForm({
    mode: "onChange",
    resolver: yupResolver(schemaInfor),
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
  const navi = useNavigate();
  const handleClick = () => {
    localStorage.setItem("token", "");
    navi("/loginPage");
  };

  const [showModal, setShowModal] = useState(false);
  const handleOk = () => {
    setShowModal((pre) => !pre);
    form2.handleSubmit(handleOnSubmit)();
  };

  const update = async (value) => {
    try {
      const res = await axios({
        method: "PUT",
        url: "http://localhost:7000/api/v1/user/changeInfor",
        headers: {
          token: localStorage.getItem("token"),
        },
        data: { ...value },
      });
      if (res) {
        if (res.data === "Đã cập nhật thành công") {
          toast.success(res.data);
        } else {
          toast.success(res.data);
        }
      } else {
        toast.error("Thất Bại");
      }
    } catch (error) {
      toast.error("lỗi");
    }
  };
  useEffect(() => {
    const ListErrors = Object.values(form2.formState.errors);
    if (ListErrors.length > 0) {
      ListErrors.map((error) => toast.error(error.message), {
        pauseOnHover: false,
        delay: 0,
      });
    }
  }, [form2.formState.errors]);
  const handleCannel = () => {
    setShowModal((pre) => !pre);
  };
  const handleChangeInfor = () => {
    setShowModal((pre) => !pre);
  };
  const handleOnSubmit = (value) => {
    console.log(value);
    update(value);
  };
  return (
    <DashboarchPageStyle>
      <div style={{ display: "flex" }}>
        <div className="dashboard_infor">
          {" "}
          <NavLink className="changeMail">Email : {user.email}</NavLink>
          <div>Tên : {user.name}</div>
          <div>Số điện thoại : {user.numberPhone}</div>
          <div onClick={handleClick} className="logout">
            {" "}
            Đăng xuất{" "}
          </div>
        </div>
        <div className="avartar" onClick={handleChangeInfor}>
          Thay đổi thông tin
        </div>
      </div>
      <div className="dashboard_password">
        <div>Mật khẩu : *******</div>
        <NavLink
          className="dashboard_password_change"
          onClick={handleClickChangePassword}
        >
          Thay đổi mật khẩu{" "}
        </NavLink>
        <div>Update Avatar !</div>
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
      <Modal
        title="Thay đổi thông tin"
        visible={showModal}
        onCancel={handleCannel}
        onOk={form2.handleSubmit(handleOnSubmit)}
        cancelText={false}
      >
        <form>
          <Field>
            <label>Xác nhận password</label>
            <InputPassword
              type="password"
              placeholder="Nhập password của bạn"
              name="passwordd"
              control={form2.control}
            ></InputPassword>
          </Field>
          <Field>
            <label>Email muốn thay đổi</label>
            <Input
              defaultValue={user ? user.email : ""}
              type="email"
              placeholder="Nhập email của bạn"
              name="email"
              control={form2.control}
            ></Input>
          </Field>
          <Field>
            <label>Tên muốn thay đổi</label>
            <Input
              defaultValue={user ? user.name : ""}
              type="text"
              placeholder="Nhập tên của bạn"
              name="name"
              control={form2.control}
            ></Input>
          </Field>
          <Field>
            <label>Số Điện Thoại muốn thay đổi</label>
            <Input
              defaultValue={user ? user.numberPhone : ""}
              type="text"
              placeholder="Nhập số điện thoai của bạn"
              name="numberPhone"
              control={form2.control}
            ></Input>
          </Field>
        </form>
      </Modal>
    </DashboarchPageStyle>
  );
}

export default DashboarchPage;
