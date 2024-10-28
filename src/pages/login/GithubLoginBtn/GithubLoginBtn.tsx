import { GithubLoginBtnStylesWrapper } from "./GithubLoginBtn.styles";

const GithubLoginBtn = () => {
  return (
    <GithubLoginBtnStylesWrapper>
      <img src="/github-icon.svg" alt="" />
      <i>github로 로그인하기</i>
    </GithubLoginBtnStylesWrapper>
  );
};
export default GithubLoginBtn;
