import { GithubLoginBtnStylesWrapper } from "./GithubLoginBtn.styles";

const GithubLoginBtn = () => {
  return (
    <GithubLoginBtnStylesWrapper>
      <img src="/github-icon.svg" alt="" />
      <i
        onClick={async () => {
          const response = await fetch("http://140.245.78.132:8080/api/auth/github", {
            credentials: "include",
          });
          const data = await response.json();
          console.log(data);
          window.location.href = data.redirect;
        }}
      >
        GitHub로 로그인하기
      </i>
    </GithubLoginBtnStylesWrapper>
  );
};
export default GithubLoginBtn;
