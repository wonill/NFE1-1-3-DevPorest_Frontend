import ky from "ky";
import { GithubLoginBtnStylesWrapper } from "./GithubLoginBtn.styles";

interface loginResponse {
  redirect: string;
}

const GithubLoginBtn = () => {
  return (
    <GithubLoginBtnStylesWrapper>
      <img src="/github-icon.svg" alt="" />
      <i
        onClick={async () => {
          const data = await ky("http://140.245.78.132:8080/api/auth/github").json<loginResponse>();
          window.location.href = data.redirect;
        }}
      >
        GitHub로 로그인하기
      </i>
    </GithubLoginBtnStylesWrapper>
  );
};
export default GithubLoginBtn;
