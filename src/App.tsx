import React from "react";
import { Global, css } from "@emotion/react";
import { global } from "./styles/reset";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/main/MainPage";
import ProfilePage from "./pages/profile/ProfilePage";
import SearchPage from "./pages/search/SearchPage";
import LoginPage from "./pages/login/LoginPage";
import DetailPage from "./pages/detail/DetailPage";
import Register from "./pages/register/Register";
import EditPortfolioPage from "./pages/edit_portfolio/EditPortfolioPage";
import EditProfilePage from "./pages/edit_profile/EditProfilePage";
import MainLayout from "./layouts/MainLayout";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Global
        styles={css`
          ${global}
        `}
      />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<MainPage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="detail" element={<DetailPage />} />
          <Route path="edit_portfolio" element={<EditPortfolioPage />} />
        </Route>
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<Register />} />
        <Route path="edit_profile" element={<EditProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
