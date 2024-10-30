import { LoginPageWrapper } from "./LoginPage.styles";
import { Link } from "react-router-dom";
import Logo from "../../components/Logo/Logo";
import GithubLoginBtn from "./GithubLoginBtn/GithubLoginBtn";

const LoginPage = () => {
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
