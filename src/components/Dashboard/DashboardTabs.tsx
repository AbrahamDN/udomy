import React from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Heading,
  Container,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import CourseContent from "../CourseContent";

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
  const [isMediumScreen] = useMediaQuery("(min-width: 52em)");

  return (
    <Tabs w="full" zIndex={1} bgColor="transparent">
      <TabList>
        <Container maxW="5xl" display="flex" gap={5}>
          {!sidebar && <DashboardTab title="Course content" />}
          <DashboardTab title="Overview" />
        </Container>
      </TabList>

      <TabPanels>
        {!sidebar && (
          <TabPanel>
            <Container
              py={8}
              px={isMediumScreen ? "inherit" : 0}
              maxW={isMediumScreen ? "3xl" : "full"}
            >
              <CourseContent />
            </Container>
          </TabPanel>
        )}
        <TabPanel>
          <Container maxW="5xl" py={8}>
            <Heading as="h3" fontSize="2xl" mb={4}>
              Overview
            </Heading>

            <Text maxW="xl">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo
              velit, quod ea quibusdam eius blanditiis, animi dignissimos eum
              autem quae doloremque minus aperiam officiis, quia labore pariatur
              saepe possimus architecto.
            </Text>
          </Container>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default DashboardTabs;
