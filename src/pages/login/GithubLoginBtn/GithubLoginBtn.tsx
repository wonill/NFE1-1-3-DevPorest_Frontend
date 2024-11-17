import api from "../../../api";
import { GithubLoginBtnStylesWrapper } from "./GithubLoginBtn.styles";

interface loginResponse {
  redirect: string;
}

const GithubLoginBtn = () => {
  return (
    <GithubLoginBtnStylesWrapper
      onClick={async () => {
        const data = await api("auth/github").json<loginResponse>();
        window.location.href = data.redirect;
      }}
    >
      <img src="/github-icon.svg" alt="" />
      <i>GitHub로 로그인하기</i>
    </GithubLoginBtnStylesWrapper>
  );
};
export default GithubLoginBtn;
