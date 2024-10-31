import styled from "@emotion/styled";

export const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 13px;

  @media (max-width: calc(768px)) {
    align-items: center;
  }
`;

export const NameAndJob = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  @media (max-width: calc(768px)) {
    align-items: center;
  }
`;

export const UserName = styled.strong`
  font-size: 2rem;
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.THICK};
`;

export const Job = styled.p`
  font-size: 1.2rem;
  color: #525b76;
`;

export const Contact = styled.div`
  display: flex;
  gap: 1rem;
  color: #525b76;
  @media (max-width: calc(768px)) {
    flex-direction: column;
    gap: 10px;
  }
`;

export const TelWrapper = styled.div`
  display: flex;
  gap: 5px;
`;

export const EmailWrpper = styled.div`
  display: flex;
  gap: 5px;
`;

export const Intro = styled.p`
  max-width: 700px;
  max-height: 70px;
  overflow: auto;
  padding-right: 10px;
  line-height: 1.3rem;

  &::-webkit-scrollbar {
    width: 12px;
  }
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: #cecece;
    border-radius: 6px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #aaaaaa;
  }

  @media (max-width: calc(1100px + 2rem)) {
    max-width: 50dvw;
  }

  @media (max-width: calc(768px)) {
    max-width: 80dvw;
  }
`;
