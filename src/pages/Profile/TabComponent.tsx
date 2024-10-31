import React from "react";
import { TabContainer, Tab } from "./Tab.style";

interface TabComponentProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TabComponent: React.FC<TabComponentProps> = ({
  tabs,
  activeTab,
  onTabChange,
}) => {
  return (
    <TabContainer>
      {tabs.map((tab) => (
        <Tab
          key={tab}
          active={tab === activeTab}
          onClick={() => onTabChange(tab)}
        >
          {tab}
        </Tab>
      ))}
    </TabContainer>
  );
};

export default TabComponent;
