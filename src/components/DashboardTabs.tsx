import React, { useState } from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Heading,
  Button,
} from "@chakra-ui/react";

type TabTitleProps = { title: string };
type DashboardTabsProps = { sidebar: boolean };

const DashboardTab = ({ title }: TabTitleProps) => {
  return (
    <Tab
      px={0}
      py={4}
      color="blackAlpha.700"
      _selected={{ borderColor: "black", color: "black" }}
      _focus={{ bgColor: "transparent" }}
      _hover={{ color: "black" }}
    >
      <Heading as="h2" w="full" fontSize="md" color="inherit">
        {title}
      </Heading>
    </Tab>
  );
};

const DashboardTabs = ({ sidebar }: DashboardTabsProps) => {
  return (
    <Tabs w="full" zIndex={1} bgColor="transparent">
      <TabList display="flex" gap={5}>
        {!sidebar && <DashboardTab title="Course content" />}
        <DashboardTab title="Notes" />
        <DashboardTab title="About" />
      </TabList>

      <TabPanels>
        {!sidebar && (
          <TabPanel>
            <p>Course section</p>
          </TabPanel>
        )}
        <TabPanel>
          <p>Notes</p>
        </TabPanel>
        <TabPanel>
          <p>Overview</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default DashboardTabs;
