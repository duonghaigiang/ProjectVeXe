import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Avatar, Popover } from "antd";

import Btn from "./../../button/btn";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth/authContext";

Header.propTypes = {};
const HeaderStyled = styled.div`
  background-color: ${(props) => props.theme.primary};
  padding: 15px 0;
  width: 100%;
  .header_logo {
    display: block;
    max-width: 60px;
    margin-left: 20px;
  }
  .container {
    background-color: ${(props) => props.theme.primary};
    display: flex;
    align-items: center;
  }
  .header_menu {
    display: flex;
    display: flex;
    align-items: center;
    list-style-type: none;
  }
  .header_item > a {
    color: #fff;
    padding: 4px;
    margin-left: 24px;
    font-size: 19px;
    text-decoration: none;
    list-style-type: none;
  }
  .headerRight {
    margin-left: auto;
    display: flex;
    align-items: center;
    /* display: flex;
    justify-items: flex-end; */
    /* position: relative;
    
    right: 0; */

    .headerRight__search {
      padding: 10px;
      background-color: #fff;
      border: 1px solid ${(props) => props.theme.primary};
      border-radius: 8px;
      width: 100%;
      max-width: 420px;
      display: flex;
      align-items: center;
      margin: 0 8px;
      justify-content: space-between;

      .headerRight__search__icon {
        cursor: pointer;
        padding: 10px 15px;
        border: 1px solid #000;
        border-radius: 5px;
      }
      /* position: relative; */
    }

    .headerRight__search__item {
      /* position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 20px; */
    }
  }
  .btn {
    border-radius: 14px;
    margin: 0;
    padding: 8px;
    border: 1px solid ${(props) => props.theme.second};
  }
  .btn:hover {
    opacity: 0.6;
    border: 1px solid ${(props) => props.theme.prima};
  }
  .btn_login {
    font-size: 18px;
    text-decoration: none;
    color: ${(props) => props.theme.second};
  }
  .headerRight__Name {
    color: #fff;
    cursor: pointer;
  }
  .Avatar_Content {
    display: flex;
  }
`;
function Header(props) {
  const { user, setToken } = useAuth();
  console.log(user);
  const handleLogout = () => {
    localStorage.setItem("token", "");
    setToken(localStorage.getItem("token"));
  };
  const content = (
    <div className="Avatar_Content">
      <div>
        <NavLink to="/dashboard">Thông tin tài khoản</NavLink>
      </div>
      <div>
        <a onClick={handleLogout}>Đăng xuất</a>
      </div>
    </div>
  );
  const headerMenu = [
    {
      url: "/#",
      title: "Home",
    },
    {
      url: "/#",
      title: "Blog",
    },
    {
      url: "/#",
      title: "Contact",
    },
  ];
  return (
    <HeaderStyled>
      <div className="container">
        <a href="/">
          <img
            srcSet="./logo.webp 2x"
            alt="vexe.com"
            className="header_logo"
          ></img>
        </a>
        <div>
          <ul className="header_menu">
            {headerMenu.map((item) => (
              <li key={item.title} className="header_item">
                <a href={item.url}>{item.title}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className="headerRight">
          <div className="headerRight__search">
            <input
              className="headerRight__search__item"
              type="text"
              placeholder="Search ... ?"
            ></input>
            <span className="headerRight__search__icon ">
              <svg
                width="18"
                height="17"
                viewBox="0 0 18 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <ellipse
                  cx="7.66669"
                  cy="7.05161"
                  rx="6.66669"
                  ry="6.05161"
                  stroke="#999999"
                  strokeWidth="1.5"
                />
                <path
                  d="M17.0001 15.5237L15.2223 13.9099L14.3334 13.103L12.5557 11.4893"
                  stroke="#999999"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M11.6665 12.2964C12.9671 12.1544 13.3706 11.8067 13.4443 10.6826"
                  stroke="#999999"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </div>
          {user && user != undefined ? (
            <div>
              Well come <span className="headerRight__Name">{user.name} !</span>
              <Popover
                content={content}
                title={`${user ? user.name + "  " : ""}`}
              >
                {user.avatar ? (
                  <Avatar
                    src={user.avatar}
                    style={{
                      backgroundColor: "#ccc",
                      verticalAlign: "middle",
                    }}
                    size="large"
                  ></Avatar>
                ) : (
                  <Avatar
                    style={{
                      backgroundColor: "#ccc",
                      verticalAlign: "middle",
                    }}
                    size="large"
                  >
                    {user.name ? user.name.charAt(0).toUpperCase() : "user"}
                  </Avatar>
                )}
              </Popover>
            </div>
          ) : (
            <div>
              <Btn className="btn">
                <NavLink to={"/loginPage"} className="btn_login">
                  Đăng nhập
                </NavLink>
              </Btn>
            </div>
          )}
        </div>
      </div>
    </HeaderStyled>
  );
}

export default Header;
