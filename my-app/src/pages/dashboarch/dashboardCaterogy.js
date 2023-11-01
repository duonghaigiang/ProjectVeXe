import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Modal, Pagination } from "antd";
import axios from "axios";
import styled from "styled-components";
import Heading from "./../../components/heading/Heading";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../components/context/auth/authContext";
import Field from "./../../components/field/Field";
import Input from "./../../components/input/Input";
import { useForm } from "react-hook-form";
import queryString from "query-string";
import Btn from "./../../components/button/btn";
import Select from "../../components/select/select";
const WrapperStyled = styled.div`
  margin: 40px 35px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .tableStation {
    font-size: 14px;
    border: 1px solid #000;
    background-color: #fff;
    width: 100%;
    text-align: left;
  }

  .table_Row {
    padding: 10px;
    border-bottom: 1px solid #ccc;
    color: #fff;
  }
  .table_RU {
    display: flex;
    .table_R_item {
      margin: 0 4px;
      padding: 2px;
      background-color: red;
      border-radius: 4px;
      color: #fff;
      :hover {
        transition: 0.2s linear;
        cursor: pointer;
        color: #fff;
      }
    }
    .table_U_item {
      padding: 2px;
      border-radius: 4px;
      background-color: ${(props) => props.theme.primary};
      color: #fff;

      margin: 0 4px;
      :hover {
        transition: 0.2s linear;
        cursor: pointer;
        color: #fff;
      }
    }
    .form {
      width: 650px;
    }
    .pagination {
    }
  }
  .blue-bg {
    background-color: #0866ff;
  }

  .red-bg {
    background-color: #d11013;
  }
  .con {
    display: block;
    padding: 4px;
    width: 20px;
    height: 20px;
    background-color: #0866ff;
  }
  .ngung {
    display: block;
    padding: 4px;
    background-color: #d11013;
    height: 20px;
    width: 20px;
  }
`;
DashboardCaterogy.propTypes = {};
function DashboardCaterogy(props) {
  const [page, setPage] = useState(0);
  const [station, setStation] = useState([]);
  const [itemStation, setItemStation] = useState({});
  const [remove, setRemove] = useState(false);
  const navi = useNavigate();
  const { user } = useAuth();
  const pageSize = 5;
  const getLitmit = async () => {
    const res = await axios({
      method: "POST",
      url: "http://localhost:7000/api/v1/stations/getLitmit",
      data: { page, pageSize },
    });
    setStation(res.data);
    return res.data;
  };
  useEffect(() => {
    getLitmit();
  }, [page]);
  const handleClick = (value) => {
    removeStation(value);
    setRemove(true);
  };

  const removeStation = async (value) => {
    try {
      const { id } = value;
      const res = await axios({
        method: "DELETE",
        url: `http://localhost:7000/api/v1/stations/${id}`,
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      if (res) {
        toast.success(res.data);
      } else {
        toast.error("error");
      }
    } catch (error) {
      console.log(error);
    }
  };
  // useEffect(() => {
  //   setRemove(false);
  //   removeStation();
  // }, [remove]);
  const local = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataForm, setDataForm] = useState({});
  const [updateId, setUpdateId] = useState();
  const [curentDataStation, setCurentDataStation] = useState({});
  const statusStation = ["con", "ngung"];
  const showModalUpdate = (item) => {
    setIsModalOpen(true);
    setUpdateId(item.id);
    setCurentDataStation(item);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onChange = () => {
    setCurentDataStation({ ...curentDataStation });
  };
  const handleSubmitForm = async (value) => {
    try {
      const res = await axios({
        method: "PUT",
        url: `http://localhost:7000/api/v1/stations/${updateId}`,
        headers: {
          token: localStorage.getItem("token"),
        },
        data: { ...value },
      });
      if (res) {
        toast.success(res.data);
      } else {
        toast.error(res.data);
      }
    } catch (error) {
      toast.error("error");
    }
  };
  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({
    mode: "onChange",
  });
  return (
    <div>
      <Modal
        title="Thay đổi trạm"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <form className="form" onSubmit={handleSubmit(handleSubmitForm)}>
          <Field>
            <label>Tên trạm</label>
            <Input
              type="text"
              defaultValue={curentDataStation ? curentDataStation.name : ""}
              name="name"
              control={control}
              placeholder="Thay đổi tên trạm"
            ></Input>
          </Field>
          <Field>
            <label>Địa chỉ</label>
            <Input
              type="text"
              defaultValue={curentDataStation ? curentDataStation.address : ""}
              name="address"
              control={control}
              placeholder="Thay đổi địa chỉ"
            ></Input>
          </Field>
          <Field>
            <label>Tỉnh thành</label>
            <Input
              defaultValue={curentDataStation ? curentDataStation.province : ""}
              type="text"
              name="province"
              control={control}
              placeholder="Thay đổi tỉnh"
            ></Input>
          </Field>
          <Field>
            <label>Số Điện Thoại</label>
            <Input
              defaultValue={
                curentDataStation ? curentDataStation.numberPhone : ""
              }
              type="text"
              name="numberPhone"
              control={control}
              placeholder="Thay đổi Số điện thoại"
            ></Input>
          </Field>
          <Field>
            <label>Mô tả</label>
            <Input
              defaultValue={
                curentDataStation ? curentDataStation.description : ""
              }
              type="text"
              name="description"
              control={control}
              placeholder="Thay đổi tỉnh"
            ></Input>
          </Field>
          <Field>
            <label>Set trạng thái nhà xe</label>
            <Select
              name="status"
              register={register}
              items={statusStation}
            ></Select>
          </Field>
          <Btn type="submit" onClick={handleCancel}>
            Ok
          </Btn>
        </form>
      </Modal>
      <Heading>Danh Sách các Trạm hiện hành</Heading>
      <div className="colorStation">
        <div>
          Hiện Hành
          <div className="con"></div>
        </div>
        <div>
          Tạm ngưng
          <div className="ngung"></div>
        </div>
      </div>
      <WrapperStyled>
        {user.type === "admin" ? (
          <div>
            {station.map((item, index) => (
              <tr
                key={item.id}
                className={`tableStation ${
                  item.status == "con" ? "blue-bg" : "red-bg"
                }  `}
              >
                <td className="table_Row">{page * pageSize + index}</td>
                <td className="table_Row">{item.name}</td>
                <td className="table_Row">{item.address}</td>
                <td className="table_Row"> {item.province}</td>
                <td className="table_Row"> {item.numberPhone}</td>
                <td className="table_Row"> {item.description}</td>
                <div className="table_RU">
                  <div
                    onClick={() => handleClick(item)}
                    className="table_R_item"
                  >
                    Xóa
                  </div>

                  <div
                    className="table_U_item"
                    onClick={() => showModalUpdate(item)}
                  >
                    Sửa
                  </div>
                </div>
              </tr>
            ))}
          </div>
        ) : (
          <div>
            {station.map((item, index) => (
              <tr
                key={item.id}
                className={`tableStation ${
                  item.status == "con" ? "blue-bg" : "red-bg"
                }  `}
              >
                <td className="table_Row">{page * pageSize + index}</td>
                <td className="table_Row">{item.name}</td>
                <td className="table_Row">{item.address}</td>
                <td className="table_Row"> {item.province}</td>
                <td className="table_Row"> {item.numberPhone}</td>
                <td className="table_Row"> {item.description}</td>
              </tr>
            ))}
          </div>
        )}
        {
          <div className="pagination">
            <Pagination
              total={50}
              current={page + 1}
              pageSize={pageSize}
              onChange={(page) => setPage(page - 1)}
            ></Pagination>
          </div>
        }
        <br />
      </WrapperStyled>
    </div>
  );
}

export default DashboardCaterogy;
