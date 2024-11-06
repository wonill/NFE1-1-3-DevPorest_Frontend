import styled from "@emotion/styled";

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.PADDINGS.X_LARGE};
  gap: ${({ theme }) => theme.PADDINGS.X_LARGE};
  width: 1100px;
  margin: auto;
`;

export const UserProfileSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: ${({ theme }) => theme.PADDINGS.LARGE};
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.PADDINGS.LARGE};
`;

export const UserImage = styled.div`
  width: 130px;
  height: 130px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.COLORS.MAIN_GRAY};
  border-radius: ${({ theme }) => theme.BORDER_RADIUS.CIRCLE};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: inherit;
    cursor: pointer;
  }
`;

export const Title = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: ${({ theme }) => theme.COLORS.MAIN_BLACK};
  gap: ${({ theme }) => theme.PADDINGS.SMALL};

  > h2 {
    font-size: ${({ theme }) => theme.FONT_SIZE.HEADING2};
    font-weight: ${({ theme }) => theme.FONT_WEIGHT.THICKER};
  }

  > p {
    font-size: ${({ theme }) => theme.FONT_SIZE.CONTENT};
    font-weight: ${({ theme }) => theme.FONT_WEIGHT.THIN};
  }
`;

export const StatsAndTags = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  > div {
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.PADDINGS.X_SMALL};
  }
`;

export const CommentImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.THICKER};
  color: #7c8484;
  margin-left: 4px;

  img {
    margin-right: 4px;
  }
`;

export const LinksSection = styled.section``;

export const Link = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.PADDINGS.X_SMALL};

  > div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20px;
    height: 20px;
  }

  > a {
    color: inherit;
  }
`;

export const ContentSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => `calc(${theme.PADDINGS.X_SMALL} / 3)`};

  img {
    max-width: 100%;
    border: 1px solid ${({ theme }) => theme.COLORS.LIGHTGREEN_GRAY};
    border-radius: ${({ theme }) => theme.BORDER_RADIUS.DEFAULT};
    object-fit: contain;
  }
`;

export const ActionBtnSection = styled.section`
  border-top: 1px solid ${({ theme }) => theme.COLORS.MAIN_GRAY};
  padding-top: ${({ theme }) => theme.PADDINGS.X_LARGE};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => `calc(${theme.PADDINGS.X_LARGE} * 2)`};
`;

export const EditDeleteSection = styled.section`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: ${({ theme }) => theme.PADDINGS.SMALL};
`;

export const CommentSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;

  > * > p {
    color: ${({ theme }) => theme.COLORS.MAIN_BLACK};
    font-weight: ${({ theme }) => theme.FONT_WEIGHT.THICK};
  }
`;

export const CommentWrite = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CommentView = styled.div`
  display: flex;
  flex-direction: column;

  & > *:first-of-type {
    padding-bottom: ${({ theme }) => theme.PADDINGS.SMALL};
  }

  & > *:nth-of-type(n + 2) {
    padding-bottom: ${({ theme }) => theme.PADDINGS.LARGE};
  }
`;

export const Indicator = styled.div`
  height: 20px;
  margin: 20px 0;
`;
