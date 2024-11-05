import Graph, { GraphDataType } from "../../components/Graph/Graph";
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
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { TechStackStatType } from "../../types/api-types/TechStackType";
import { getTechStackStatistic } from "../../api/get-tech-stacks";

const GraphSection = () => {
  const navigate = useNavigate();
  const [techStacks, setTechStacks] = useState<TechStackStatType[]>([]);
  const [statistics, setStatistics] = useState<GraphDataType[]>([]);
  const [frontStats, setfrontStats] = useState<GraphDataType[]>([]);
  const [backendStats, setBackendStats] = useState<GraphDataType[]>([]);

  useEffect(() => {
    const fetchTechStackList = async () => {
      const result = await getTechStackStatistic();
      console.log(result);
      if (Array.isArray(result)) setTechStacks(result);
    }
    fetchTechStackList();
  }, [])

  useEffect(() => {
    if (techStacks.length > 0) {
      const front = techStacks.filter(techStack => techStack.jobCode === '671f9d162a296054c7477856' && techStack.totalCount > 0).map((v) => ({
        id: v.skill,
        value: v.totalCount,
        color: v.bgColor,
      }));
      setfrontStats(front);
      console.log('프론트', front);
      const back = techStacks.filter(techStack => techStack.jobCode === '672616239a64f518f7c8d530' && techStack.totalCount > 0).map((v) => ({
        id: v.skill,
        value: v.totalCount,
        color: v.bgColor,
      }));
      setBackendStats(back);
      console.log('백엔드', back);
    }
  }, [techStacks]); // techStacks가 변경될 때마다 실행

  return (
    <StyledGraphSection>
      <SectionTitle>기술 스택별 점유율</SectionTitle>
      <GraphSectionSubTitele>
        DevProest에서 인기 기술 스택 포트폴리오를 지금 확인하세요!
      </GraphSectionSubTitele>
      <GraphWrapper>
        <FrontendGraph>
          <Graph
            data={frontStats}
            onClick={(frontStats) => console.log(frontStats.id, frontStats.value)}
          />
          <GraphTitle>Frontend</GraphTitle>
        </FrontendGraph>
        <BackendGraph>
          <Graph
            data={backendStats}
            onClick={(backendStats) => console.log(backendStats.id, backendStats.value)}
          />
          <GraphTitle>Backend</GraphTitle>
        </BackendGraph>
      </GraphWrapper>
    </StyledGraphSection>
  );
};

export default GraphSection;
