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
  gap: 4rem;
  padding: ${({ theme }) => theme.PADDINGS.X_LARGE};
  border: 3px solid ${({ theme }) => theme.COLORS.LIGHTGREEN_BG_SUB};
  border-radius: ${({ theme }) => theme.BORDER_RADIUS.DEFAULT};
  background-color: ${({ theme }) => theme.COLORS.LIGHTGREEN_BG};
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.4);
`;

export const LeftUserInfo = styled.div`
  flex: 3;
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
  flex: 7;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.PADDINGS.X_LARGE};
`;

export const SelectContainer = styled.div`
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: ${({ theme }) => theme.PADDINGS.X_LARGE};
`;

export const SelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.PADDINGS.SMALL};

  p {
    font-size: ${({ theme }) => theme.FONT_SIZE.HEADING3};
    font-weight: ${({ theme }) => theme.FONT_WEIGHT.THICK};
    color: ${({ theme }) => theme.COLORS.MAIN_BLACK};
  }

  button.select-btn {
  }

  div {
    display: flex;
    gap: ${({ theme }) => theme.PADDINGS.X_SMALL};
  }
`;

export const SelectBtn = styled.button`
  width: 90px;
  height: 42px;
  border-radius: ${({ theme }) => theme.BORDER_RADIUS.HALF_CIRCLE};
  background-color: ${({ theme }) => theme.COLORS.LIGHTGREEN_GRAY};
  border: none;
  padding: ${({ theme }) => theme.PADDINGS.X_SMALL} ${({ theme }) => theme.PADDINGS.SMALL};
  cursor: pointer;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-top: 10px solid ${({ theme }) => theme.COLORS.MAIN_BLACK};
  }
`;

export const Intro = styled.textarea`
  height: 40%;
  width: 100%;
  padding: ${({ theme }) => theme.PADDINGS.X_SMALL};
  border-radius: ${({ theme }) => theme.BORDER_RADIUS.DEFAULT};
  border: 1px solid ${({ theme }) => theme.COLORS.MAIN_GRAY};
  color: ${({ theme }) => theme.COLORS.MAIN_BLACK};
  font-size: ${({ theme }) => theme.FONT_SIZE.CONTENT};

  &:focus {
    outline: 1px solid ${({ theme }) => theme.COLORS.MAIN_GREEN};
  }
`;

export const SubmitBtn = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: ${({ theme }) => theme.PADDINGS.MEDIUM};
`;
