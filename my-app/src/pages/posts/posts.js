import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Heading from "../../components/heading/Heading";
import axios from "axios";
import styled from "styled-components";
import Btn from "../../components/button/btn";
import { Modal } from "antd";
import { useForm } from "react-hook-form";
import Field from "./../../components/field/Field";
import Input from "./../../components/input/Input";
import { toast } from "react-toastify";

Posts.propTypes = {};
const Wrapper = styled.div`
  padding: 18px;
  .wrapItem {
    display: flex;
  }
  .item {
    margin: 14px;
    display: flex;
    width: 500px;
    justify-content: space-between;

    background-color: #fff;
    padding: 4px;
    border-radius: 10px;
  }
  .itemTrip,
  .itemID {
    margin-right: 24px;
  }
  .btnChange {
    margin-left: 12px;
    border: 1px solid #fff;
    border-radius: 4px;
    padding: 0 4px;
    background-color: red;
    color: #fff;
    cursor: pointer;
  }
  .btnChange:hover {
    opacity: 0.5;
    transition: all 0.5s;
  }
`;
function Posts(props) {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: "http://localhost:7000/api/v1/posts/get",
      });
      if (res) {
        setPosts(res.data);
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchPosts();
  }, []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [curentDataStation, setCurentDataStation] = useState({});

  const showModal = (item) => {
    setIsModalOpen(true);
    setCurentDataStation(item);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });
  const handleSubmitForm = async (value) => {
    const { id } = curentDataStation;
    const res = await axios({
      method: "PUT",
      url: `http://localhost:7000/api/v1/posts/put/${id}`,
      data: {
        ...value,
      },
    });
    if (res) {
      toast.success(res.data);
    } else {
      toast.error("Đã có lỗi !!");
    }
  };
  return (
    <Wrapper>
      <Heading>Thay đổi các tuyến đường phổ biến</Heading>
      <div>
        {posts.length > 0
          ? posts.map((item) => (
              <div key={item.id} className="wrapItem">
                <div className="item">
                  <div className="itemID">{item.id}</div>
                  <div className="itemTrip">{item.trip}</div>
                  <div>{item.price}</div>
                  <div className="btnChange" onClick={() => showModal(item)}>
                    sửa
                  </div>
                </div>
              </div>
            ))
          : ""}
      </div>
      <Modal
        title="Thay đổi các tuyến đường phù hợp"
        open={isModalOpen}
        footer={null}
        onCancel={handleCancel}
      >
        {" "}
        <form className="form" onSubmit={handleSubmit(handleSubmitForm)}>
          <Field>
            <label>Tên trạm</label>
            <Input
              type="text"
              defaultValue={curentDataStation ? curentDataStation.trip : ""}
              name="trip"
              control={control}
              placeholder="Thay đổi tên trạm "
            ></Input>
          </Field>
          <Field>
            <label>Giá</label>
            <Input
              type="text"
              defaultValue={curentDataStation ? curentDataStation.price : ""}
              name="price"
              control={control}
              placeholder="Thay đổi giá "
            ></Input>
          </Field>
          <Btn type="submit">Thay đổi</Btn>
        </form>
      </Modal>
    </Wrapper>
  );
}

export default Posts;
