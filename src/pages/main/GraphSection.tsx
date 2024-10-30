import Graph from "../../components/Graph/Graph";
import { SectionTitle } from "./MainPage.style";

import { graphData } from "../../data/mainPageData";
import {
  StyledGraphSection,
  GraphSectionSubTitele,
  GraphWrapper,
  FrontendGraph,
  BackendGraph,
  GraphTitle,
} from "./GraphSection.style";

const GraphSection = () => {
  return (
    <StyledGraphSection>
      <SectionTitle>기술 스택별 점유율</SectionTitle>
      <GraphSectionSubTitele>
        DevProest에서 인기 기술 스택 포트폴리오를 지금 확인하세요!
      </GraphSectionSubTitele>
      <GraphWrapper>
        <FrontendGraph>
          <Graph
            data={graphData}
            onClick={(data) => console.log(data.id, data.value)}
          />
          <GraphTitle>Frontend</GraphTitle>
        </FrontendGraph>
        <BackendGraph>
          <Graph
            data={graphData}
            onClick={(data) => console.log(data.id, data.value)}
          />
          <GraphTitle>Backend</GraphTitle>
        </BackendGraph>
      </GraphWrapper>
    </StyledGraphSection>
  );
};

export default GraphSection;
