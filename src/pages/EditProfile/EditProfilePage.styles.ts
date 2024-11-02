import styled from "@emotion/styled";

export const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const EditProfilePageContainer = styled.div`
  width: 1100px;
  margin: auto;

  span {
    display: inline-block;
    text-align: center;
  }
`;

export const H2 = styled.h2`
  font-size: ${({ theme }) => theme.FONT_SIZE.HEADING2};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.THICK};
  margin: auto;
  margin-bottom: ${({ theme }) => theme.PADDINGS.LARGE};
`;

export const EditProfileWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => `calc(${theme.PADDINGS.X_LARGE} * 2)`};
  padding: ${({ theme }) => `calc(${theme.PADDINGS.X_LARGE} * 1.5)`};
  border: 3px solid ${({ theme }) => theme.COLORS.LIGHTGREEN_SUB};
  border-radius: ${({ theme }) => theme.BORDER_RADIUS.DEFAULT};
  background-color: ${({ theme }) => theme.COLORS.LIGHTGREEN_BG};
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.4);
`;

export const LeftUserInfo = styled.div`
  flex: 4;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: ${({ theme }) => theme.PADDINGS.MEDIUM};
`;

export const UserInfoInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: ${({ theme }) => theme.PADDINGS.X_SMALL};

  p {
    font-size: ${({ theme }) => theme.FONT_SIZE.HEADING3};
    font-weight: ${({ theme }) => theme.FONT_WEIGHT.THICK};
  }
`;

export const RightUserInfo = styled.div`
  flex: 6;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: ${({ theme }) => theme.PADDINGS.X_LARGE};
  width: 60%;
`;

export const SelectContainer = styled.div`
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: ${({ theme }) => theme.PADDINGS.X_SMALL};
`;

export const SelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: ${({ theme }) => theme.PADDINGS.X_SMALL};
  height: 40%;

  div {
    display: flex;
    flex-wrap: wrap;
    gap: ${({ theme }) => `calc(${theme.PADDINGS.X_SMALL} / 3)`};
  }
`;

export const SelectBtn = styled.button`
  width: 140px;
  height: 42px;
  border-radius: ${({ theme }) => theme.BORDER_RADIUS.HALF_CIRCLE};
  background-color: ${({ theme }) => theme.COLORS.LIGHTGREEN_GRAY};
  border: none;
  padding: ${({ theme }) => theme.PADDINGS.X_SMALL} ${({ theme }) => theme.PADDINGS.SMALL};
  cursor: pointer;
  position: relative;
  font-size: ${({ theme }) => theme.FONT_SIZE.CONTENT};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.THICK};

  &::after {
    content: "";
    position: absolute;
    top: 40%;
    left: 8px;
    transform: translateY(-50%);
    transform: rotate(90deg);
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-top: 10px solid ${({ theme }) => theme.COLORS.MAIN_BLACK};
  }
`;

export const Intro = styled.textarea`
  height: 35%;
  width: 100%;
  padding: ${({ theme }) => theme.PADDINGS.X_SMALL};
  border-radius: ${({ theme }) => theme.BORDER_RADIUS.DEFAULT};
  border: 1px solid ${({ theme }) => theme.COLORS.MAIN_GRAY};
  color: ${({ theme }) => theme.COLORS.MAIN_BLACK};
  font-size: ${({ theme }) => theme.FONT_SIZE.CONTENT};
  resize: none;

  &:focus {
    outline: 1px solid ${({ theme }) => theme.COLORS.MAIN_GREEN};
  }
`;

export const SubmitBtn = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: ${({ theme }) => theme.PADDINGS.MEDIUM};
`;
