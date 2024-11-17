import { useEffect, useState } from "react";
import { ITechStackType } from "../types/api-types/TechStackType";
import { JobGroupType } from "../types/api-types/JobGroup";
import { getTechStacks } from "../api/get-tech-stacks";
import { getJobGroup } from "../api/get-job-group";

export const useTechStacksAndJobGroups = () => {
  // 추후 store를 사용하여 상태 관리
  const [techStackList, setTechStackList] = useState<ITechStackType[]>([]);
  const [jobGroupList, setJobGroupList] = useState<JobGroupType[]>([]);

  useEffect(() => {
    Promise.all([getTechStacks(), getJobGroup()])
      .then(([techStacksData, jobGroupData]) => {
        if (techStacksData && Array.isArray(techStacksData)) {
          setTechStackList(techStacksData);
        }
        if (jobGroupData && Array.isArray(jobGroupData)) {
          setJobGroupList(jobGroupData);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return { techStackList, jobGroupList };
};
