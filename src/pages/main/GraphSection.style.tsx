import styled from "@emotion/styled";

export const StyledGraphSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${({ theme }) => theme.PADDINGS.X_LARGE} 0
    calc(${({ theme }) => theme.PADDINGS.X_LARGE} * 2) 0;
`;

export const GraphSectionSubTitele = styled.p`
  max-width: 300px;
  text-align: center;
  margin: ${({ theme }) => theme.PADDINGS.SMALL};
  font-size: 16px;
`;

export const GraphWrapper = styled.div`
  margin-top: ${({ theme }) => theme.PADDINGS.SMALL};
  width: 100%;
  display: flex;
  padding-left: 10px;

  @media (max-width: 860px) {
    flex-direction: column;
  }
`;

export const FrontendGraph = styled.div`
  width: 50%;

  > div {
    display: flex;
    justify-content: center;
  }

  @media (max-width: 860px) {
    width: 100%;
  }
`;
export const BackendGraph = styled.div`
  width: 50%;

  > div {
    display: flex;
    justify-content: center;
  }

  @media (max-width: 860px) {
    width: 100%;
  }
`;

export const GraphTitle = styled.strong`
  display: block;
  text-align: center;
  font-size: ${({ theme }) => theme.FONT_SIZE.HEADING3};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.THICK};
`;
