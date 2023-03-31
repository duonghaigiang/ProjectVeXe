import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useAuth } from "../../components/context/auth/authContext";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Heading from "./../../components/heading/Heading";
import queryString from "query-string";
import styled from "styled-components";
import useLoadMore from "../../components/hook/hookLoadingMore/HookLoadingMore";
import Btn from "./../../components/button/btn";
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

  return (
    <WrapperStyle>
      <Heading>Các trạm chuyến đi :{trip.length} chuyến</Heading>
      <div className="WrappblockTrip">
        <div className="blockTrip">
          {displayedItems.map((item) => (
            <div key={item.id} className="blickTrip__item">
              <div className="Item">{item.name}</div>
              <div className="Item">{item.address}</div>
              <div className="Item">{item.numberPhone}</div>
              <div className="Item">{item.description}</div>
              <Btn className="btn">Đặt vé</Btn>
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
