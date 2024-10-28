import { HeaderWrapper } from "./Header.styles";
import Button from "../Button/Button";
// import { Link } from "react-router-dom";

interface HeaderProps {
  onEnterSearch?: (word: string) => void;
  onClickLogin?: () => void;
  onClickRegister?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  onEnterSearch,
  onClickLogin,
  onClickRegister,
}) => {
  return (
    <HeaderWrapper>
      {/* <Link to="/" className="logo"> */}
      <i className="logo">
        <img src="/Tree_logo.svg" alt="tree-logo" />
        <img src="/DEVPOREST_logo.svg" alt="DevPorest" />
      </i>
      {/* </Link> */}
      <div className="wrap">
        <input
          type="text"
          className="searchBar"
          placeholder="다양한 개발자 포트폴리오 검색"
          onKeyDown={(ev) => {
            if (ev.key === "Enter" && onEnterSearch) {
              onEnterSearch("searchword");
            }
          }}
        />
        <img src="/search.svg" className="searchIcon" alt="" />
        <Button text="로그인" colorType={0} onClick={onClickLogin} />
        <Button text="회원가입" colorType={3} onClick={onClickRegister} />
      </div>
    </HeaderWrapper>
  );
};
export default Header;
