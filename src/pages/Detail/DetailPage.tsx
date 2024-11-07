import React, { useState, useEffect, useRef } from "react";
import {
  Main,
  UserProfileSection,
  TitleWrapper,
  UserImage,
  Title,
  StatsAndTags,
  CommentImage,
  LinksSection,
  Link,
  ContentSection,
  ActionBtnSection,
  EditDeleteSection,
  CommentSection,
  CommentWrite,
  CommentView,
  Indicator,
} from "./DetailPage.styles";
import "ckeditor5/ckeditor5.css";
import noImg from "../../assets/no_image.svg";
import TechStack from "../../components/TechStack/TechStack";
import Tag from "../../components/Tag/Tag";
// import { techStacks, dummyTags2, links, dummyContents, dummyComments } from "../../data/dummyData";
import LikesAndViews from "../../components/LikesAndViews/LikesAndViews";
import comment from "../../assets/comment.svg";
import link from "../../assets/link.svg";
import HTMLReactParser from "html-react-parser/lib/index";
import DetailPageButton from "../../components/DetailPageButton/DetailPageButton";
import Button from "../../components/Button/Button";
import CommentInput from "../../components/CommentInput/CommentInput";
import CommentBox from "../../components/CommentBox/CommentBox";
import Modal from "../../components/Modal/Modal";
import { DetailPortfolioType, PortfolioResType } from "../../types/api-types/PortfolioType";
import { CommentApiResType, CommentResType } from "../../types/api-types/CommentType";
import userApi from "../../api/index";
import { UserApiResType, UserProfileResType } from "../../types/api-types/UserType";
import { useNavigate, useParams } from "react-router-dom";
import useStoreSearchPage from "../../store/store-search-page";
import { ITechStackType } from "./../../types/api-types/TechStackType";
import { useTechStacksAndJobGroups } from "../../hooks/useTechStacksAndJobGroups";
import Alert from "../../components/Alert/Alert";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const DetailPage: React.FC = () => {
  const { portfolio_id } = useParams(); // useParams로 id 받아오기
  const [portfolioId, setPortfolioId] = useState<string>(portfolio_id || "");
  const [portfolioData, setPortfolioData] = useState<DetailPortfolioType | undefined>(undefined);
  const [portfolioUserId, setPortfolioUserId] = useState<string>();
  const [commentPage] = useState(1);
  const [totComment, setTotComment] = useState<number>();
  const [comments, setComments] = useState<CommentResType[]>([]);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const [isPortfolioModalOpen, setIsPortfolioModalOpen] = useState(false);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState<string | null>(null);
  const [pdfLoading, setPdfLoading] = useState<boolean>(false);
  const [loggedInID, setLoggedInID] = useState<string | undefined>("");
  const [alertText, setAlertText] = useState("");
  const [isLiked, setIsLiked] = useState<boolean>();
  const [likeCount, setLikeCount] = useState<number>();
  const { setSearchParams } = useStoreSearchPage();
  const { jobGroupList } = useTechStacksAndJobGroups();
  const pdfRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();

  const fetchLoggedInUser = async () => {
    try {
      const response = await userApi.get(`users/user`);
      const jsonData: UserApiResType<UserProfileResType> = await response.json();
      setLoggedInID(jsonData.data?.userID);
      console.log(jsonData.data?.userID, "로 로그인되어있습니다.");
    } catch (err) {
      console.error(err);
      setLoggedInID(undefined);
    }
  };

  const fetchPortfolio = async (portfolio_id: string) => {
    try {
      const response = await userApi.get(`portfolios/${portfolio_id}`);
      const jsonData: PortfolioResType = await response.json();

      setPortfolioData(prev => {
        if (!prev) return jsonData.data;
        return {
          ...prev,
          ...jsonData.data,
        };
      });
      setPortfolioUserId(jsonData.data?.userInfo.userID);

      if (!jsonData.success) {
        throw new Error(`Server responded with ${jsonData.message}`);
      }
    } catch (err) {
      console.error("상세 에러 정보:", err);
    }
  };

  const fetchComment = async (portfolio_id: string) => {
    try {
      const response = await userApi.get(`comments/${portfolio_id}?page=${commentPage}?limit=20`);
      const jsonData: CommentApiResType = await response.json();

      if (!jsonData.success) {
        throw new Error(`Server responded with ${jsonData.success}`);
      }

      // 데이터가 배열인지 확인하고 타입 안전하게 업데이트
      if (Array.isArray(jsonData.data)) {
        setComments(jsonData.data);
        setTotComment(jsonData.pagination.totalComments);
      }

      return jsonData.data;
    } catch (err) {
      console.error("상세 에러 정보:", err);
      // 에러 발생시 빈 배열로 설정
      setComments([]);
      return [];
    }
  };

  const linkToProfile = () => {
    console.log("pid", portfolioUserId);
    if (portfolioUserId) navigate(`/profile/${portfolioUserId}`);
  };

  const toggleLike = async () => {
    try {
      const res: { like: boolean; likeCount: number } = await userApi
        .post(`portfolios/${portfolio_id}/like`)
        .json();
      setLikeCount(res.likeCount);
      setIsLiked(!isLiked);
    } catch (err) {
      console.error("상세 에러 정보:", err);
    }
  };
  const checkLike = async (portfolio_id: string) => {
    try {
      const res1: { like: boolean; likeCount: number } = await userApi
        .post(`portfolios/${portfolio_id}/like`)
        .json();
      setIsLiked(!res1.like);
      const res2: { like: boolean; likeCount: number } = await userApi
        .post(`portfolios/${portfolio_id}/like`)
        .json(); // 현재 상태 확인 후 다시 토글
      setLikeCount(res2.likeCount);
    } catch (err) {
      console.error("상세 에러 정보:", err);
    }
  };
  const isLikeChecked = useRef(false);
  useEffect(() => {
    if (!!localStorage.getItem("token")) fetchLoggedInUser(); // 로그인 토큰 존재시 불러오기
    console.log(portfolioId);
    if (portfolioId) {
      setPortfolioId(portfolioId);
      fetchPortfolio(portfolioId);
      fetchComment(portfolioId);
      if (!isLikeChecked.current) {
        checkLike(portfolioId);
        isLikeChecked.current = true;
      }
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // loadMoreData();
        }
      });
    });

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [comments]);

  // 포트폴리오 삭제
  const handlePortfolioDelete = () => {
    setIsPortfolioModalOpen(false);
    const deletePortfolio = async () => {
      try {
        if (!portfolioData?._id) {
          throw new Error("Portfolio ID is missing");
        }

        const response = await userApi.delete(`/portfolios/${portfolioData._id}`).json();
        return response;
      } catch (error) {
        console.error("포폴 삭제 중 에러 발생:", error);
        throw error;
      }
    };
    deletePortfolio();
  };

  // 댓글 삭제
  const handleCommentDelete = () => {
    console.log(`댓글 id ${selectedCommentId} 삭제하는 로직`);
    setIsCommentModalOpen(false); // 모달 닫기
    const deleteComment = async () => {
      try {
        if (!selectedCommentId) {
          throw new Error("Comment ID is missing");
        }
        await userApi.delete(`comments/${selectedCommentId}`).json();
        fetchComment(portfolioId);
      } catch (error) {
        console.error("댓굴 삭제 중 에러 발생:", error);
        throw error;
      }
    };
    deleteComment();
  };

  const handleTechStackClick = (item: ITechStackType) => {
    const selectedJobGroup = jobGroupList.filter(jobGroup => jobGroup._id === item.jobCode);
    setSearchParams({
      techStacks: item.skill,
      jobGroup: selectedJobGroup[0].job,
      keyword: "",
      searchType: "title",
    });
    navigate("/search");
  };

  const handleTagClick = (tag: string) => {
    setSearchParams({ searchType: "tag", keyword: tag, techStacks: "", jobGroup: "all" });
    navigate("/search");
  };

  const copyUrlToClipBoard = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      setAlertText("URl 복사가 완료되었습니다.");
    });
    setAlertText("");
  };

  const handleDownloadPdf = async () => {
    if (pdfRef.current) {
      setPdfLoading(true);
      // 캔버스로 변환
      const canvas = await html2canvas(pdfRef.current, {
        scale: 2, // 고해상도
        useCORS: true,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "pt", "a4"); // A4 크기 PDF
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;

      // 비율에 따른 이미지 크기 설정
      const imgWidth = pdfWidth;
      const imgHeight = (canvasHeight * pdfWidth) / canvasWidth;

      let position = 0; // 이미지 시작 위치 (yOffset)

      // 여러 페이지로 나누어 출력
      while (position < imgHeight) {
        // 현재 페이지에 이미지 추가
        pdf.addImage(
          imgData,
          "PNG",
          0,
          -position, // 페이지 상에서 이미지 위치 조정
          imgWidth,
          imgHeight,
        );
        position += pdfHeight; // 다음 페이지로 이동

        // 추가 페이지 필요시 addPage()
        if (position < imgHeight) {
          pdf.addPage();
        }
      }

      // PDF 저장
      pdf.save(`${portfolioId}.pdf`);
      setPdfLoading(false);
    }
  };

  return (
    <Main>
      <UserProfileSection>
        <TitleWrapper>
          <UserImage>
            <img
              src={portfolioData?.userInfo.profileImage || noImg}
              alt="noImg"
              onClick={linkToProfile}
            />
          </UserImage>
          <Title>
            <h2>{portfolioData?.title}</h2>
            <p style={{ overflow: "none" }}></p>
          </Title>
        </TitleWrapper>
        <StatsAndTags>
          <div>
            {portfolioData?.techStack
              ? portfolioData.techStack
                  .slice(0, 3)
                  .map(techStack => (
                    <TechStack
                      key={techStack.skill}
                      content={{ ...techStack }}
                      onClick={() => handleTechStackClick(techStack)}
                    />
                  ))
              : ""}
            {portfolioData?.tags?.map((tag, i) => (
              <Tag key={i} content={tag} onClick={() => handleTagClick(tag)} />
            ))}
          </div>
          <div>
            {portfolioData ? (
              <LikesAndViews views={portfolioData?.view} likes={likeCount || 0} />
            ) : (
              ""
            )}
            <CommentImage>
              <img src={comment} alt="" />
              {totComment}
            </CommentImage>
          </div>
        </StatsAndTags>
      </UserProfileSection>
      <LinksSection>
        {portfolioData?.links?.map((url, i) => (
          <Link key={i}>
            <div>
              <img src={link} alt="" />
            </div>
            <a href={url}>{url}</a>
          </Link>
        ))}
      </LinksSection>
      <ContentSection ref={pdfRef}>
        <img src={portfolioData?.thumbnailImage || noImg} />
        <p style={{ height: "5rem" }} />
        <div className="ck-content">
          {portfolioData?.contents ? HTMLReactParser(portfolioData.contents) : ""}
        </div>
      </ContentSection>
      <ActionBtnSection>
        {alertText && <Alert text={alertText} />}
        <DetailPageButton text="좋아요" isLiked={isLiked} onClick={toggleLike} />
        <DetailPageButton text="공유하기" onClick={copyUrlToClipBoard} />
        <DetailPageButton text="PDF로 내보내기" onClick={handleDownloadPdf} disabled={pdfLoading} />
      </ActionBtnSection>
      {portfolioUserId === loggedInID ? (
        <EditDeleteSection>
          <Button
            text="수정"
            colorType={1}
            onClick={() => {
              navigate(`/edit_portfolio/${portfolioId}`);
            }}
          />
          <Button text="삭제" colorType={1} onClick={() => setIsPortfolioModalOpen(true)} />
        </EditDeleteSection>
      ) : (
        ""
      )}
      <CommentSection>
        <CommentWrite>
          <p>댓글 작성하기</p>
          <CommentInput
            portfolioID={portfolioId as string}
            isLoggedIn={!!loggedInID}
            onCommentAdded={() => fetchComment(portfolioId)}
          />
        </CommentWrite>
        <CommentView>
          <p>댓글 ({totComment || 0})</p>
          {Array.isArray(comments) &&
            comments.map((comment, i) => (
              <CommentBox
                key={comment._id} // index 대신 고유 ID 사용
                {...comment}
                isMyComment={loggedInID === comment.userID}
                onClickDelete={() => {
                  setSelectedCommentId(comment._id);
                  setIsCommentModalOpen(true);
                }}
                onCommentAdded={() => fetchComment(portfolioId)}
              />
            ))}
        </CommentView>
      </CommentSection>

      <Indicator ref={loadMoreRef} />
      <Modal
        isOpen={isPortfolioModalOpen}
        onClose={() => setIsPortfolioModalOpen(false)}
        onConfirm={handlePortfolioDelete}
        message="정말로 이 포트폴리오를 삭제하시겠습니까?"
      />

      <Modal
        isOpen={isCommentModalOpen}
        onClose={() => setIsCommentModalOpen(false)}
        onConfirm={handleCommentDelete}
        message="정말로 이 댓글을 삭제하시겠습니까?"
      />
    </Main>
  );
};

export default DetailPage;
