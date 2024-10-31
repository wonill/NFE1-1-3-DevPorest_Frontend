import React, { useState, useEffect, useRef, useCallback } from "react";
import { ResponsivePie, ComputedDatum } from "@nivo/pie";
import { GraphContainer } from "./Graph.styles";

export interface GraphDataType {
  id: string;
  value: number;
  color: string;
}

interface GraphType {
  data: GraphDataType[];
  onClick: (data: ComputedDatum<GraphDataType>) => void; // 클릭 핸들러 추가
}

const Graph: React.FC<GraphType> = ({ data, onClick }) => {
  const [translateX, setTranslateX] = useState(0);
  const graphContainerRef = useRef<HTMLDivElement>(null);

  const getTranslateX = useCallback((width: number) => {
    if (width >= 800) return 10 * (18 - Math.ceil(width / 50));
    if (width >= 600) return 30 * (16 - Math.ceil(width / 50)) + 35;
    if (width >= 400) return 30 * (16 - Math.ceil(width / 50)) + 20;
    return 230;
  }, []);

  const handleResize = useCallback(() => {
    if (graphContainerRef.current) {
      const width = graphContainerRef.current.clientWidth;
      setTranslateX(getTranslateX(width));
    }
  }, [getTranslateX]);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  const sortedData = [...data].sort((a, b) => b.value - a.value);
  const topItems = sortedData.slice(0, 5);
  const otherValue = sortedData
    .slice(5)
    .reduce((sum, item) => sum + item.value, 0);

  const processedData =
    otherValue > 0
      ? [...topItems, { id: "기타", value: otherValue, color: "#ccc" }]
      : topItems;

  const textStyle = {
    fontFamily: "Pretendard",
    fontSize: 16,
    fontWeight: 600,
  };

  return (
    <GraphContainer ref={graphContainerRef}>
      <ResponsivePie
        data={processedData}
        margin={{ top: 50, right: 160, bottom: 50, left: 0 }}
        innerRadius={0.5}
        padAngle={1}
        cornerRadius={3}
        activeOuterRadiusOffset={5}
        borderWidth={1}
        arcLabelsTextColor={"#201E50"}
        enableArcLinkLabels={false}
        theme={{
          labels: { text: textStyle },
          legends: { text: textStyle },
        }}
        legends={[
          {
            anchor: "right",
            direction: "column",
            itemsSpacing: 24,
            itemWidth: 170,
            itemHeight: 18,
            itemTextColor: "#201E50",
            symbolSize: 20,
            symbolShape: "circle",
            translateX: translateX,
          },
        ]}
        colors={processedData.map((item) => item.color)}
        onClick={onClick}
      />
    </GraphContainer>
  );
};

export default Graph;
