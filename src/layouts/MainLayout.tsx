import React from "react";
import Header from "../components/Header/Header";
import { Outlet } from "react-router-dom";
import Footer from "./../components/Footer/Footer";
import { MainLayoutContainer } from "./MainLayout.styles";

const MainLayout: React.FC = () => {
  return (
    <MainLayoutContainer>
      <Header />
      <Outlet />
      <Footer />
    </MainLayoutContainer>
  );
};

export default MainLayout;
