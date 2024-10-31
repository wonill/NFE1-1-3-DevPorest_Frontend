import styled from "@emotion/styled";

export const ProfileImageWrapper = styled.div`
  width: 207px;
  height: 207px;

  position: relative;
  @media (min-width: 768px) {
    margin-bottom: 0.75rem;
  }
`;

export const ProfileImageInnerWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.BORDER_RADIUS.CIRCLE};
`;

export const ProfileImage = styled.img`
  width: 100%;
  object-fit: cover;
`;
