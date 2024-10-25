import React from 'react';
import { ResponsivePie, ComputedDatum } from '@nivo/pie';
import { GraphContainer } from './Graph.styles';

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
  const sortedData = [...data].sort((a, b) => b.value - a.value);
  const topItems = sortedData.slice(0, 5);
  const otherValue = sortedData.slice(5).reduce((sum, item) => sum + item.value, 0);

  const processedData =
    otherValue > 0 ? [...topItems, { id: '기타', value: otherValue, color: '#ccc' }] : topItems;

  const textStyle = {
    fontFamily: 'Pretendard',
    fontSize: 16,
    fontWeight: 600,
  };

  return (
    <GraphContainer>
      <ResponsivePie
        data={processedData}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={1}
        cornerRadius={3}
        activeOuterRadiusOffset={5}
        borderWidth={1}
        arcLabelsTextColor={'#201E50'}
        enableArcLinkLabels={false}
        theme={{
          labels: { text: textStyle },
          legends: { text: textStyle },
        }}
        legends={[
          {
            anchor: 'right',
            direction: 'column',
            itemsSpacing: 24,
            itemWidth: 100,
            itemHeight: 18,
            itemTextColor: '#201E50',
            symbolSize: 24,
            symbolShape: 'circle',
          },
        ]}
        colors={processedData.map(item => item.color)}
        onClick={onClick}
      />
    </GraphContainer>
  );
};

export default Graph;
