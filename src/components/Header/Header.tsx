import { HeaderWrapper, SearchBarWrapper } from "./Header.styles";
import Button from "../Button/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../Logo/Logo";
import { UserApiResType, UserProfileResType } from "../../types/api-types/UserType";
import { useEffect, useState } from "react";
import ky from "ky";
import noImg from "../../assets/no_image.svg";
const apiUrl = import.meta.env.VITE_SERVER_URL;
import useStoreSearchPage from "../../store/store-search-page";

interface HeaderCompProps {
  userProfile?: UserProfileResType;
  isSearchPage: boolean;
  isSearchOpen: boolean;
  setIsSearchOpen: (b: boolean) => void;
  toggleSearch: () => void;
}

const Header = () => {
  const [isSearchPage, setIsSearchPage] = useState(false);
  const [userId, setUserId] = useState<string | undefined>("");
  const [userProfile, setUserProfile] = useState<UserProfileResType>();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  useEffect(() => {
    setIsSearchPage(location.pathname === "/search");
  }, [useLocation()]);

  useEffect(() => {
    const fetchLoggedInUser = async () => {
      try {
        const response = await ky.get(`${apiUrl}/users/user`);
        if (!response.ok) {
          setUserId(undefined);
          throw new Error("헤더: 유저 정보를 불러오는 데 실패했습니다.");
        }

        const jsonData: UserApiResType<UserProfileResType> = await response.json();
        setUserProfile(jsonData.data);
        setUserId(jsonData.data?.userID);
        console.log("헤더: ", userId, "로 로그인되어있습니다.");
      } catch (err) {
        console.error(err);
      }
    };
    fetchLoggedInUser();
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
  toggleSearch,
}) => {
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
        <Link to={`/profile/${userProfile?.userID}`}>
          <img className="profileImg" src={userProfile?.profileImage || noImg} alt="image" />
        </Link>
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
}: {
  isMainBar: boolean;
  setIsSearchOpen: (b: boolean) => void;
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
      <img src="/search-icon.svg" className={`searchIcon ${isMainBar ? "" : "md-hidden"}`} alt="" />
    </SearchBarWrapper>
  );
};
export default Header;
