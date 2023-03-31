import React from "react";
import PropTypes from "prop-types";
import Field from "../../components/field/Field";
import Input from "../../components/input/Input";
import { useForm } from "react-hook-form";
import Btn from "../../components/button/btn";
import Heading from "./../../components/heading/Heading";
import styled from "styled-components";
import axios from "axios";
import { toast } from "react-toastify";

DashboardPostStation.propTypes = {};
const DashboardPostStationStyle = styled.div`
  padding: 20px;
`;
function DashboardPostStation(props) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  const handleSubmitForm = async (value) => {
    try {
      const res = await axios({
        method: "POST",
        url: "http://localhost:7000/api/v1/stations/",
        data: { ...value },
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      if (res) {
        toast.success("Tạo Trạm thành công !");
        console.log(res.data);
        return res.data;
      } else {
        toast.error("Tạo thất bại");
      }
    } catch (error) {
      toast.error("Lỗi Server");
    }
  };

  return (
    <DashboardPostStationStyle>
      <Heading> Nhập các trạm</Heading>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <Field>
          <label>Name</label>
          <Input type="text" name="name" control={control}></Input>
        </Field>
        <Field>
          <label>Address</label>
          <Input type="text" name="address" control={control}></Input>
        </Field>
        <Field>
          <label>Province</label>
          <Input type="text" name="province" control={control}></Input>
        </Field>
        <Field>
          <label>NumberPhone</label>
          <Input type="text" name="numberPhone" control={control}></Input>
        </Field>
        <Field>
          <label>Description</label>
          <Input type="text" name="description" control={control}></Input>
        </Field>

        <Btn type="submit"> Nhập</Btn>
      </form>
    </DashboardPostStationStyle>
  );
}

export default DashboardPostStation;
