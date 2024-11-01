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
import noImg from "../../assets/no_image.svg";
import TechStack from "../../components/TechStack/TechStack";
import Tag from "../../components/Tag/Tag";
import {
  techStacks,
  dummyTags2,
  links,
  dummyContents,
  dummyComments,
} from "../../data/dummyData";
import LikesAndViews from "../../components/LikesAndViews/LikesAndViews";
import comment from "../../assets/comment.svg";
import link from "../../assets/link.svg";
import HTMLReactParser from "html-react-parser/lib/index";
import DetailPageButton from "../../components/DetailPageButton/DetailPageButton";
import Button from "../../components/Button/Button";
import CommentInput from "../../components/CommentInput/CommentInput";
import CommentBox from "../../components/CommentBox/CommentBox";
import Modal from "../../components/Modal/Modal";

const DetailPage: React.FC = () => {
  const [visibleData, setVisibleData] = useState(dummyComments.slice(0, 5));
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const [isPortfolioModalOpen, setIsPortfolioModalOpen] = useState(false);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  // 추후에 아이디 넣을 때 number로 수정
  const [selectedCommentId, setSelectedCommentId] = useState<string | null>(
    null
  );

  const loadMoreData = () => {
    const nextData = dummyComments.slice(
      visibleData.length,
      visibleData.length + 5
    );
    setVisibleData((prev) => [...prev, ...nextData]);
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          loadMoreData();
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
  }, [visibleData]);

  // 포트폴리오 삭제
  const handlePortfolioDelete = () => {
    setIsPortfolioModalOpen(false);
    console.log("포트폴리오 삭제 로직");
  };

  // 댓글 삭제
  const handleCommentDelete = () => {
    console.log(`댓글 id ${selectedCommentId} 삭제하는 로직`);
    // setVisibleData((prev) =>
    //   prev.filter((comment) => comment.id !== selectedCommentId)
    // );
    setIsCommentModalOpen(false); // 모달 닫기
  };

  return (
    <Main>
      <UserProfileSection>
        <TitleWrapper>
          <UserImage>
            <img src={noImg} alt="userImg" />
          </UserImage>
          <Title>
            <h2>제목이 들어갑니다.</h2>
            <p>설명이 들어갑니다. 설명 설명 설명</p>
          </Title>
        </TitleWrapper>
        <StatsAndTags>
          <div>
            {techStacks.slice(0, 3).map((techStack) => (
              <TechStack
                key={techStack.skill}
                content={{ ...techStack }}
                onClick={() => {}}
              />
            ))}
            {dummyTags2.map((tag, i) => (
              <Tag key={i} {...tag} />
            ))}
          </div>
          <div>
            <LikesAndViews views={262} likes={7} />
            <CommentImage>
              <img src={comment} alt="" />
              {dummyComments.length}
            </CommentImage>
          </div>
        </StatsAndTags>
      </UserProfileSection>
      <LinksSection>
        {links.map((url, i) => (
          <Link key={i}>
            <div>
              <img src={link} alt="" />
            </div>
            <a href={url}>{url}</a>
          </Link>
        ))}
      </LinksSection>
      <ContentSection>{HTMLReactParser(dummyContents)}</ContentSection>
      <ActionBtnSection>
        <DetailPageButton
          text="좋아요"
          onClick={() => console.log("clicked!")}
        />
        <DetailPageButton
          text="공유하기"
          onClick={() => console.log("clicked!")}
        />
        <DetailPageButton
          text="PDF로 내보내기"
          onClick={() => console.log("clicked!")}
        />
      </ActionBtnSection>
      <EditDeleteSection>
        <Button text="수정" colorType={1} />
        <Button
          text="삭제"
          colorType={1}
          onClick={() => setIsPortfolioModalOpen(true)}
        />
      </EditDeleteSection>
      <CommentSection>
        <CommentWrite>
          <p>댓글 작성하기</p>
          <CommentInput isLoggedin={true} />
        </CommentWrite>
        <CommentView>
          <p>댓글 ({dummyComments.length})</p>
          {visibleData.map((comment, i) => (
            <CommentBox
              key={i}
              {...comment}
              onClick={() => {
                // 추후에 아이디로 수정
                setSelectedCommentId(visibleData[i].name);
                setIsCommentModalOpen(true);
              }}
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
