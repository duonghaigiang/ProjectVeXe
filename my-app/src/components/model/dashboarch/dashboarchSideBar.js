import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../../context/auth/authContext";
import IconUSer from "./../../icon/IconUSer";
import IconPost from "./../../icon/IconPost";
import IconCategory from "./../../icon/IconCategory";
import IconManyUser from "./../../icon/IconmanyUSer";
import IconEdit from "./../../icon/IconEdit";
import IconTicket from "./../../icon/IconTicket";
const StyledSpan = styled.span`
  color: ${(props) => props.theme.primary};
`;
const SidebarStyles = styled.div`
  width: 300px;
  background: #282828;
  box-shadow: 10px 10px 20px rgba(218, 213, 213, 0.15);
  border-radius: 12px;
  .sidebar-logo {
    display: flex;
    align-items: center;
    font-weight: 600;
    gap: 0 20px;
    img {
      max-width: 40px;
    }
    margin-bottom: 20px;
    padding: 20px 20px 0;
  }

  .menu-item {
    border-radius: 10px;
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 14px 20px;
    font-weight: 500;
    color: ${(props) => props.theme.primary};
    margin-bottom: 20px;
    cursor: pointer;
    &.active,
    &:hover {
      background: #f1fbf7;
      color: #000;
    }
  }
  .header_dashboard {
    display: flex;
    align-items: center;
    span {
      margin-left: 12px;
      text-decoration: none;
      color: ${(props) => props.theme.primary};
    }
  }
  .displayFlex {
    display: flex;
  }
`;
const sidebarLinks = [
  {
    title: (
      <div className="displayFlex">
        <IconUSer />
        {" Thông tin tài khoản"}
      </div>
    ),
    url: "/dashboard",
  },
  {
    title: (
      <div className="displayFlex">
        <IconPost />
        {"Thêm Trạm Xe"}
      </div>
    ),
    url: "/manage/post",
    visibility: "adminOnly",
  },
  {
    title: (
      <div className="displayFlex">
        <IconCategory />
        {" Danh Sách Trạm Xe"}
      </div>
    ),
    url: "/manage/category",
  },
  {
    title: (
      <div className="displayFlex">
        <IconManyUser></IconManyUser>
        {"Quản lý người dùng"}
      </div>
    ),
    url: "/manage/user",
    visibility: "adminOnly",
  },
  {
    title: (
      <div className="displayFlex">
        <IconEdit></IconEdit>
        {"Cập nhật tuyến đường phổ biến"}
      </div>
    ),
    url: "/adminPosts",
    visibility: "adminOnly",
  },
  {
    title: (
      <div className="displayFlex">
        <IconTicket />
        {" Ticket"}
      </div>
    ),
    url: "/ticket",
  },
];
const Sidebar = () => {
  const { user } = useAuth();
  const sidebarLink = sidebarLinks.filter((item) => {
    return item.visibility !== "adminOnly";
  });
  return (
    <SidebarStyles className="sidebar">
      <div className="sidebar-logo">
        <NavLink to="/" className="header_dashboard">
          <img srcSet="/logo.webp 2x" alt="" />

          <StyledSpan>VEXE</StyledSpan>
        </NavLink>
      </div>
      {user.type === "admin"
        ? sidebarLinks.map((link) => (
            <NavLink to={link.url} className="menu-item">
              <span className="menu-text">{link.title}</span>
            </NavLink>
          ))
        : sidebarLink.map((link) => (
            <NavLink to={link.url} className="menu-item">
              <span className="menu-text">{link.title}</span>
            </NavLink>
          ))}
    </SidebarStyles>
  );
};

export default Sidebar;
