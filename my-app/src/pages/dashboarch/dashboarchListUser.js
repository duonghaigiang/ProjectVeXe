import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Heading from "./../../components/heading/Heading";
import axios from "axios";
import { Pagination } from "antd";
import queryString from "query-string";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

DashboarchListUser.propTypes = {};
const WrapperStyled = styled.div`
  margin: 40px 35px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .tableStation {
    border: 1px solid #ccc;
    background-color: #fff;
    width: 100%;
    text-align: left;
  }

  .table_Row {
    padding: 10px;
    border-bottom: 1px solid #ccc;
  }
  .table_RU {
    display: flex;
    .table_R_item {
      margin: 0 4px;
      padding: 2px;
      border-radius: 4px;
      :hover {
        transition: 0.2s linear;
        background-color: red;
        cursor: pointer;
        color: #fff;
      }
    }
    .table_U_item {
      padding: 2px;
      border-radius: 4px;

      margin: 0 4px;
      :hover {
        transition: 0.2s linear;
        background-color: ${(props) => props.theme.primary};
        cursor: pointer;
        color: #fff;
      }
    }
    .form {
      width: 650px;
    }
    .pagination {
    }
    .headerRight__search__item {
      display: flex;
    }
  }
`;
function DashboarchListUser(props) {
  const [page, setPage] = useState(1);
  const [listUser, getListUser] = useState([]);
  const [searchText, setSearchText] = useState("");
  const pageSize = 10;
  const getUserLimit = async () => {
    const res = await axios({
      method: "GET",
      url: `http://localhost:7000/api/v1/user/listUser/?${page & pageSize}`,
      token: {
        token: localStorage.getItem("token"),
      },
    });
    if (res) {
      getListUser(res.data);
    } else {
      toast.error("Lỗi");
    }
  };
  const removeUser = async (item) => {
    const { id } = item;
    const res = await axios({
      method: "DELETE",
      url: `http://localhost:7000/api/v1/user/register/${id}`,
    });
    if (res) {
      toast.success("Xóa User Thành công!");
    } else {
      toast.error("Thất bại");
    }
  };
  const local = useLocation();
  const navi = useNavigate();
  const onChangePage = (value) => {
    setPage(value);
    const params = { page: value };
    const search = queryString.stringify(params);
    navi(`${local.pathname}?${search}`);
  };
  useEffect(() => {
    getUserLimit();
  }, [page]);

  const getUserSearch = async () => {
    const res = await axios({
      method: "GET",
      url: `http://localhost:7000/api/v1/user/findUser/?name=` + searchText,
      headers: {
        token: localStorage.getItem("token"),
      },
    });
    if (res) {
      getListUser(res.data);
    } else {
      getListUser(res.data);
    }
  };

  useEffect(() => {
    getUserSearch();
    console.log(searchText);
  }, [searchText]);
  return (
    <WrapperStyled>
      <Heading>Quản Lý User</Heading>
      <input
        className="headerRight__search__item"
        type="text"
        placeholder="Search ... ?"
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value);
        }}
      ></input>
      <div>
        <div>
          {listUser.map((item, index) => (
            <tr key={item.id} className="tableStation">
              <td className="table_Row">{(page - 1) * pageSize + index}</td>
              <td className="table_Row">{item.name}</td>
              <td className="table_Row">{item.email}</td>
              <td className="table_Row"> {item.numberPhone}</td>
              <div className="table_RU">
                {item.type != "admin" ? (
                  <div
                    className="table_R_item"
                    onClick={() => removeUser(item)}
                  >
                    Xóa
                  </div>
                ) : (
                  ""
                )}
              </div>
            </tr>
          ))}
          <div>
            <div className="pagination">
              <Pagination
                total={50}
                current={page}
                pageSize={pageSize}
                onChange={(page) => onChangePage(page)}
              ></Pagination>
            </div>
          </div>
        </div>
      </div>
    </WrapperStyled>
  );
}

export default DashboarchListUser;
