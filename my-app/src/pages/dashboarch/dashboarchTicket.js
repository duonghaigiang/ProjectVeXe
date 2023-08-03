import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Heading from "./../../components/heading/Heading";
import axios from "axios";
import { toast } from "react-toastify";
import styled from "styled-components";
import useLoadMore from "./../../components/hook/hookLoadingMore/HookLoadingMore";

DashboarchTicket.propTypes = {};
const Styled = styled.div`
  .containerTicket {
    display: flex;
    flex-direction: column;
  }
  .containerTicket_item {
    margin-left: 8px;
    margin-right: 8px;
    border-radius: 12px;
    margin-top: 4px;
    background-color: #fff;
    padding-left: 12px;
    padding-right: 12px;
  }
  .containerTicket_item_1 {
    display: flex;
    font-size: 12px;
  }
  .pading {
    padding: 0 4px;
  }
  .btnMore {
    margin-left: 4px;
    margin-top: 4px;
    border: 1px solid #000;
    border-radius: 8px;
    cursor: pointer;
    width: 100px;
    margin: auto;
  }
`;
function DashboarchTicket(props) {
  const [listTicket, setListTicket] = useState([]);
  const getListTicket = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: "http://localhost:7000/api/v1/ticket/getTicket",
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      if (res) {
        setListTicket(res.data);
      } else {
        toast.error("Đã có lỗi");
      }
    } catch (error) {
      console.error(error);
      toast.error("Đã có lỗi");
    }
  };
  useEffect(() => {
    console.log("ticket", listTicket);
  }, [listTicket]);
  useEffect(() => {
    getListTicket();
  }, []);
  const sortedTickets = listTicket.sort((a, b) => {
    // convert to date objects for comparison
    const dateA = new Date(a.ticket_CreateAt);
    const dateB = new Date(b.ticket_CreateAt);

    // descending order
    return dateB - dateA;
  });
  const [displayedItems, loadMore, canLoadMore] = useLoadMore(sortedTickets, 3);
  return (
    <Styled>
      <Heading>Vé xe của bạn </Heading>
      <div>
        <div className="containerTicket">
          {displayedItems.map((ticket, index) => (
            <div key={index} className="containerTicket_item">
              <h4>{`Ticket ID: ${ticket.ticket_id}`}</h4>
              <div className="containerTicket_item_1">
                <div style={{ width: "40%" }}>
                  {" "}
                  <p>{`User name: ${ticket.name}`}</p>
                  <p>{`User numberphone: ${ticket.numberPhone}`}</p>
                </div>
                <p className="pading">{`Station Name: ${ticket.nameStation}`}</p>
                <p className="pading">{`Station address: ${ticket.address}`}</p>
                <p className="pading">{`Station provice: ${ticket.province}`}</p>
                <p className="pading">{`Station phone: ${ticket.numberPhone_Station}`}</p>
                <p className="pading">{`Ticket_CreateAt: ${ticket.ticket_CreateAt}`}</p>
              </div>
            </div>
          ))}
        </div>
        {canLoadMore && (
          <button onClick={loadMore} className="btnMore">
            Xem thêm
          </button>
        )}
      </div>
    </Styled>
  );
}

export default DashboarchTicket;
