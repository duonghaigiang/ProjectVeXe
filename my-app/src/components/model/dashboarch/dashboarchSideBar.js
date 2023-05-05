import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../../context/auth/authContext";
const SidebarStyles = styled.div`
  width: 300px;
  background: #ccc;
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
      color: #000;
    }
  }
`;
const sidebarLinks = [
  {
    title: "Thông tin tài khoản",
    url: "/dashboard",
  },
  {
    title: "Post",
    url: "/manage/post",
  },
  {
    title: "Category",
    url: "/manage/category",
  },
  {
    title: "User",
    url: "/manage/user",
  },
  {
    title: "Change Posts",
    url: "/adminPosts",
  },
];
const Sidebar = () => {
  const { user } = useAuth();
  const sidebarLink = sidebarLinks.filter((item) => {
    return (
      item.title !== "Post" &&
      item.title !== "User" &&
      item.title !== "Change Posts"
    );
  });
  return (
    <SidebarStyles className="sidebar">
      <div className="sidebar-logo">
        <NavLink to="/" className="header_dashboard">
          <img srcSet="/logo.webp 2x" alt="" />

          <span>VEXE</span>
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
