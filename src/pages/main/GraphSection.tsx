import Graph, { GraphDataType } from "../../components/Graph/Graph";
import { SectionTitle } from "./MainPage.style";
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
import useStoreSearchPage from "../../store/store-search-page";

const frontendJobGroup = "671f9d162a296054c7477856";
const backendJobGroup = "672616239a64f518f7c8d530";

const GraphSection = () => {
  const navigate = useNavigate();
  const { setSearchParams } = useStoreSearchPage();
  const [techStacks, setTechStacks] = useState<TechStackStatType[]>([]);
  const [frontStats, setfrontStats] = useState<GraphDataType[]>([]);
  const [backendStats, setBackendStats] = useState<GraphDataType[]>([]);

  useEffect(() => {
    const fetchTechStackList = async () => {
      const result = await getTechStackStatistic();
      if (Array.isArray(result)) setTechStacks(result);
    };
    fetchTechStackList();
  }, []);

  useEffect(() => {
    if (techStacks.length > 0) {
      const front = techStacks
        .filter(techStack => techStack.jobCode === frontendJobGroup && techStack.totalCount > 0)
        .map(v => ({
          id: v.skill,
          value: v.totalCount,
          color: v.bgColor,
        }));
      setfrontStats(front);

      const back = techStacks
        .filter(techStack => techStack.jobCode === backendJobGroup && techStack.totalCount > 0)
        .map(v => ({
          id: v.skill,
          value: v.totalCount,
          color: v.bgColor,
        }));
      setBackendStats(back);
    }
  }, [techStacks]);

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
            onClick={frontStats => {
              setSearchParams({ jobGroup: "all" });
              setSearchParams({ techStacks: String(frontStats.id) });
              navigate("/search");
            }}
          />
          <GraphTitle>Frontend</GraphTitle>
        </FrontendGraph>
        <BackendGraph>
          <Graph
            data={backendStats}
            onClick={backendStats => {
              setSearchParams({ jobGroup: "all" });
              setSearchParams({ techStacks: String(backendStats.id) });
              navigate("/search");
            }}
          />
          <GraphTitle>Backend</GraphTitle>
        </BackendGraph>
      </GraphWrapper>
    </StyledGraphSection>
  );
};

export default GraphSection;
