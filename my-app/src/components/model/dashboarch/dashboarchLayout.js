import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Sidebar from "./dashboarchSideBar";
const DashboardStyles = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  height: 100%;
  background-image: linear-gradient(
    to right bottom,
    ${(props) => props.theme.primary},
    rgba(255, 166, 0, 0.761)
  );

  .dashboard {
    &-main {
      display: grid;
      grid-template-columns: 300px minmax(0, 1fr);
      padding: 40px 20px;
      gap: 0 40px;
    }
    &-children {
      background-color: #ccc;
      border-radius: 20px;
    }
  }
`;
const DashboardLayout = ({ children }) => {
  return (
    <DashboardStyles>
      <div className="dashboard-main">
        <Sidebar></Sidebar>
        <div className="dashboard-children">
          <Outlet></Outlet>
        </div>
      </div>
    </DashboardStyles>
  );
};

export default DashboardLayout;
