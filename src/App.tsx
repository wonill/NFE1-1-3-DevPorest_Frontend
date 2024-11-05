import React from "react";
import { Global, css } from "@emotion/react";
import { global } from "./styles/reset";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/main/MainPage";
import ProfilePage from "./pages/Profile/ProfilePage";
import SearchPage from "./pages/Search/SearchPage";
import LoginPage from "./pages/login/LoginPage";
import DetailPage from "./pages/Detail/DetailPage";
import Register from "./pages/register/Register";
import EditPortfolioPage from "./pages/EditPortfolio/EditPortfolioPage";
import EditProfilePage from "./pages/EditProfile/EditProfilePage";
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
          <Route path="/search" element={<SearchPage />} />
          <Route path="/detail" element={<DetailPage />} />
          <Route path="/edit_portfolio" element={<EditPortfolioPage />} />
          <Route path="/profile/:userId" element={<ProfilePage />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/edit_profile/:userId" element={<EditProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
