import { HeaderWrapper, SearchBarWrapper } from "./Header.styles";
import Button from "../Button/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../Logo/Logo";
import { UserApiResType, UserProfileResType } from "../../types/api-types/UserType";
import { useEffect, useState } from "react";
// import ky from "ky";
import noImg from "../../assets/no_image.svg";
// const apiUrl = import.meta.env.VITE_SERVER_URL;
import useStoreSearchPage from "../../store/store-search-page";
import userApi from "../../api/index";

interface HeaderCompProps {
  userProfile?: UserProfileResType;
  isSearchPage: boolean;
  isSearchOpen: boolean;
  setIsSearchOpen: (b: boolean) => void;
  isProfileOpen?: boolean;
  setIsProfileOpen?: (b: boolean) => void;
  toggleSearch: () => void;
}

const Header = () => {
  const [isSearchPage, setIsSearchPage] = useState(false);
  const [userId, setUserId] = useState<string | undefined>("");
  const [userProfile, setUserProfile] = useState<UserProfileResType>();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();
  const toggleSearch = () => {
    if (!isSearchOpen) setIsProfileOpen(false);
    setIsSearchOpen(!isSearchOpen);
  };

  useEffect(() => {
    setIsSearchPage(location.pathname === "/search");
  }, [useLocation()]);

  useEffect(() => {
    const fetchLoggedInUser = async () => {
      try {
        const response = await userApi.get(`users/user`);
        const jsonData: UserApiResType<UserProfileResType> = await response.json();
        setUserProfile(jsonData.data);
        setUserId(jsonData.data?.userID);
        console.log("헤더: ", jsonData.data?.userID, "로 로그인되어있습니다.");
      } catch (err) {
        console.error(err);
        setUserId(undefined);
      }
    };

    if (!!localStorage.getItem("token")) fetchLoggedInUser(); // 로그인 토큰 존재시 불러오기
  }, []);

  return (
    <HeaderWrapper>
      <Link to="/" className="logo">
        <Logo />
      </Link>
      {userId ? (
        <LoggedInHeaderComp
          userProfile={userProfile}
          isSearchPage={isSearchPage}
          isSearchOpen={isSearchOpen}
          setIsSearchOpen={setIsSearchOpen}
          isProfileOpen={isProfileOpen}
          setIsProfileOpen={setIsProfileOpen}
          toggleSearch={toggleSearch}
        />
      ) : (
        <LoggedOutHeaderComp
          isSearchPage={isSearchPage}
          isSearchOpen={isSearchOpen}
          setIsSearchOpen={setIsSearchOpen}
          toggleSearch={toggleSearch}
        />
      )}
    </HeaderWrapper>
  );
};
const LoggedInHeaderComp: React.FC<HeaderCompProps> = ({
  userProfile,
  isSearchPage,
  isSearchOpen,
  setIsSearchOpen,
  isProfileOpen,
  setIsProfileOpen,
  toggleSearch,
}) => {
  const logout = async () => {
    try {
      await userApi.get("auth/logout");
      localStorage.removeItem("token");
      alert("로그아웃 되었습니다");
      setIsProfileOpen ? setIsProfileOpen(false) : "";
      window.location.reload();
    } catch (err) {
      console.log("로그아웃 요청 실패했습니다 :", err);
    }
  };
  return (
    <>
      <div className="wrap">
        {isSearchPage ? (
          ""
        ) : (
          <>
            <div className="md-flex">
              <SearchBar isMainBar={true} setIsSearchOpen={setIsSearchOpen} />
            </div>
            <img
              className="searchIcon md-hidden"
              src="/search-icon.svg"
              alt=""
              onClick={toggleSearch}
            />
          </>
        )}
        <img
          className="profileImg"
          src={userProfile?.profileImage || noImg}
          alt="image"
          onClick={() => {
            setIsProfileOpen ? setIsProfileOpen(!isProfileOpen) : "";
            setIsSearchOpen(false);
          }}
        />
      </div>
      <div className={`profileModal ${isProfileOpen ? "" : "hidden"}`}>
        <Link to={`/profile`}>
          <Button text="내 프로필" colorType={0} />
        </Link>
        <Link to="/edit_portfolio">
          <Button text="포트폴리오 등록" colorType={0} />
        </Link>
        <Link to="/">
          <Button text="로그아웃" colorType={0} onClick={logout} />
        </Link>
      </div>
      {isSearchPage ? (
        ""
      ) : (
        <div className={`searchModal ${isSearchOpen ? "" : "hidden"}`}>
          <SearchBar
            isMainBar={false}
            setIsSearchOpen={setIsSearchOpen}
            setIsProfileOpen={setIsProfileOpen}
          />
        </div>
      )}
    </>
  );
};
const LoggedOutHeaderComp: React.FC<HeaderCompProps> = ({
  isSearchPage,
  isSearchOpen,
  setIsSearchOpen,
  toggleSearch,
}) => {
  return (
    <>
      <div className="wrap">
        {isSearchPage ? (
          ""
        ) : (
          <div className="md-flex">
            <SearchBar isMainBar={true} setIsSearchOpen={setIsSearchOpen} />
          </div>
        )}
        <div className="btnWrap">
          <Link to="/login">
            <Button text="로그인" colorType={0} />
          </Link>
          <Link to="/edit_profile">
            <Button text="회원가입" colorType={3} />
          </Link>
          {isSearchPage ? (
            ""
          ) : (
            <img
              className="searchIcon md-hidden"
              src="/search-icon.svg"
              alt=""
              onClick={toggleSearch}
            />
          )}
        </div>
      </div>
      {isSearchPage ? (
        ""
      ) : (
        <div className={`searchModal ${isSearchOpen ? "" : "hidden"}`}>
          <SearchBar isMainBar={false} setIsSearchOpen={setIsSearchOpen} />
        </div>
      )}
    </>
  );
};

const SearchBar = ({
  isMainBar,
  setIsSearchOpen,
  setIsProfileOpen,
}: {
  isMainBar: boolean;
  setIsSearchOpen: (b: boolean) => void;
  setIsProfileOpen?: (b: boolean) => void;
}) => {
  const [searchWord, setSearchWord] = useState("");
  const { setSearchParams } = useStoreSearchPage();
  const navigate = useNavigate();

  const handleSearch = (ev: React.KeyboardEvent<HTMLInputElement>) => {
    if (ev.key !== "Enter") return;
    if (searchWord.trim()) {
      setSearchParams({
        keyword: searchWord,
        page: 1,
        jobGroup: "all",
        techStacks: "",
        sort: "latest",
        searchType: "title",
      });
      navigate(`/search`);

      console.log(`/search로 리디랙트(keyword:${searchWord})`);
      setIsSearchOpen(false);
      setIsProfileOpen ? setIsProfileOpen(false) : "";
    }
  };
  return (
    <SearchBarWrapper>
      <input
        type="text"
        className={`searchBar ${isMainBar ? "" : "md-hidden"}`}
        placeholder="다양한 개발자 포트폴리오 검색"
        value={searchWord}
        onChange={ev => setSearchWord(ev.target.value)}
        onKeyDown={handleSearch}
      />
      <img
        src="/search-icon.svg"
        className={`searchBarIcon ${isMainBar ? "" : "md-hidden"}`}
        alt=""
      />
    </SearchBarWrapper>
  );
};
export default Header;
