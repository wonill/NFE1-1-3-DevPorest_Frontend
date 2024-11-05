import { LoginPageWrapper } from "./LoginPage.styles";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../../components/Logo/Logo";
import GithubLoginBtn from "./GithubLoginBtn/GithubLoginBtn";
import { useEffect } from "react";
import api from "../../api";
import { UserProfileResType } from "../../types/api-types/UserType";

const LoginPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  /**
   * 토큰 저장 로직 (#token=jwt)
   */
  useEffect(() => {
    const token = new URLSearchParams(location.hash.replace("#", "")).get("token");

    if (token) {
      localStorage.setItem("token", token);
      window.location.hash = "";
    }
  }, []);

  /**
   * 유저 로그인 체크
   */
  useEffect(() => {
    /**
     * 신규 유저 라우팅 함수
     * @returns void
     */
    const handleLoginRoute = async () => {
      const userInfo = await api
        .get("users/user")
        .json<UserProfileResType & { newUser: boolean }>();

      if (userInfo.newUser) {
        alert("프로필을 등록해주세요.");
        navigate("/edit-profile");
        return;
      }

      navigate("/");
    };

    const token = localStorage.getItem("token");
    if (token) {
      handleLoginRoute();
    }
  }, []);

  return (
    <LoginPageWrapper>
      <div className="wrap">
        <Link to="/" className="logo">
          <Logo scale={2} />
        </Link>
        <i>로그인</i>
        <i>깃허브 로그인으로 데브포레스트를 이용해보세요!</i>
        <GithubLoginBtn />
      </div>
    </LoginPageWrapper>
  );
};

export default LoginPage;
