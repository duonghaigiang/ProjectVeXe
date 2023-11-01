import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useAuth } from "../../components/context/auth/authContext";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Heading from "./../../components/heading/Heading";
import queryString from "query-string";
import styled from "styled-components";
import useLoadMore from "../../components/hook/hookLoadingMore/HookLoadingMore";
import Btn from "./../../components/button/btn";
import { Modal } from "antd";
import axios from "axios";

Trip.propTypes = {};
const WrapperStyle = styled.div`
  margin: 20px;
  .WrappblockTrip {
    display: flex;
    flex-direction: column;
  }
  .blockTrip {
  }
  .blickTrip__item {
    display: flex;
    padding: 0;
    align-items: center;
    margin: 8px 0;
    justify-content: space-between;
    border-radius: 14px;
    border: 1px solid ${(props) => props.theme.primary};
  }
  .blickTrip__item_ngung {
    background-color: red;
    color: #fff;
    display: flex;
    padding: 0;
    align-items: center;
    margin: 8px 0;
    justify-content: space-between;
    border-radius: 14px;
    border: 1px solid ${(props) => props.theme.primary};
  }
  .Item {
    padding: 14px 24px;
  }
  .btn {
    padding: 14px 0;
    width: 90px;
    align-items: center;
    margin: 0;
    margin-right: 8px;
  }
  .btnMore {
    border: 1px solid #000;
    border-radius: 8px;
    cursor: pointer;
    width: 100px;
    margin: auto;
  }
`;
function Trip(props) {
  const { trip } = useAuth();

  const navi = useNavigate();
  useEffect(() => {
    if (trip.length > 0) {
      return;
    } else {
      toast.warning("Hiện tại chưa có chuyến đi theo yêu cầu như vậy!!");
      navi("/");
    }
  }, [trip]);

  const [displayedItems, loadMore, canLoadMore] = useLoadMore(trip, 3);
  const [showModal, setShowModal] = useState(false);
  const { user } = useAuth();
  const [station, setSation] = useState({});

  const handleCreateTicket = (item) => {
    setShowModal(!showModal);
    setSation(item);
  };
  const handleCannel = () => {
    setShowModal(false);
  };
  const handleOk = (station) => () => {
    createTicket(station);
    setShowModal(!showModal);
  };
  const createTicket = async (dataTicket) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios({
        method: "POST",
        url: "http://localhost:7000/api/v1/ticket/create",
        headers: {
          token: `${token}`,
        },
        data: {
          Station_id: dataTicket.id,
          Station_Status: dataTicket.status,
        },
      });
      if (res) {
        if (res.data == "Station ngung!") {
          toast.warning(res.data);
        } else {
          toast.success(res.data);
        }
      } else {
        toast.warning("awarnig");
      }
    } catch (error) {
      toast.error("eror");
    }
  };
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleString());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleString());
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <WrapperStyle>
      <Heading>Các trạm chuyến đi :{trip.length} chuyến</Heading>
      <div className="WrappblockTrip">
        <div className="blockTrip">
          {displayedItems.map((item, index) => (
            <div
              key={item.id}
              className={`${
                item.status === "ngung"
                  ? "blickTrip__item_ngung"
                  : "blickTrip__item"
              }`}
            >
              <div className="Item">{item.name}</div>
              <div className="Item">{item.address}</div>
              <div className="Item">{item.numberPhone}</div>
              <div className="Item">{item.description}</div>
              <Btn className="btn" onClick={() => handleCreateTicket(item)}>
                Đặt vé
              </Btn>
              <Modal
                title="Xác Nhận Thông Tin"
                open={showModal}
                onCancel={handleCannel}
                onOk={handleOk(station)}
                cancelText={false}
              >
                <div>
                  <div></div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    {" "}
                    <h3>Thông tin tài khoản</h3>
                    <p>{currentTime}</p>
                  </div>
                  <div>{user?.email}</div>
                  <div>{user?.name}</div>
                  <div>{user?.numberPhone}</div>
                  <h3>Nhà xe</h3>
                  <div>{item.name}</div>
                  <div>{item.address}</div>
                  <div>{item.numberPhone}</div>
                </div>
              </Modal>
            </div>
          ))}
        </div>
        {canLoadMore && (
          <button onClick={loadMore} className="btnMore">
            Xem thêm
          </button>
        )}
      </div>
    </WrapperStyle>
  );
}

export default Trip;
