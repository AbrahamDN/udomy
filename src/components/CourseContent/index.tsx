import React from "react";

import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  Stack,
} from "@chakra-ui/react";
import SectionButton from "./SectionButton";
import CurriculumItem from "./CurriculumItem";
import { useCourseData } from "../../globalStates";
import currExtensions from "../../../contstants/curriculumExtensions.schema";
import convertHMS from "../../utils/convertHMS";

const CourseContent = () => {
  const [courseData] = useCourseData();
  const courseSections = courseData?.children;
  const courseRootFiles = courseSections?.filter(
    (data) => data.type === "file"
  );
  const courseRootDirs = courseSections?.filter(
    (data) => data.type === "directory"
  );

  return (
    <Accordion defaultIndex={[0]} allowMultiple>
      {courseRootFiles?.length > 0 && (
        <AccordionItem borderColor="gray.300">
          <SectionButton
            title="Base section"
            itemsCompleted={0}
            itemsCount={courseRootFiles?.length || 0}
            // timeLength={convertHMS(data.custom.duration)}
          />

          <AccordionPanel p={0}>
            <Stack spacing={0} direction="column">
              {courseRootFiles.map((data, i) => {
                const item = currExtensions.find(
                  ({ extension }) => extension === data.extension
                );

                return (
                  item?.extension && (
                    <CurriculumItem
                      key={`curr-item-${i}`}
                      title={data.name}
                      type={item.type}
                      timeLength={convertHMS(data.custom.duration)}
                    />
                  )
                );
              })}
            </Stack>
          </AccordionPanel>
        </AccordionItem>
      )}

      {courseRootDirs?.map((data, idx) => (
        <AccordionItem key={`accordion-item-${idx}`} borderColor="gray.300">
          <SectionButton
            title={data.name}
            itemsCompleted={0}
            itemsCount={data.children?.length || 0}
            timeLength={convertHMS(data.custom.duration)}
          />

          <AccordionPanel p={0}>
            <Stack spacing={0} direction="column">
              {data.children.map((child, i) => {
                const item = currExtensions.find(
                  ({ extension }) => extension === child.extension
                );

                return (
                  item?.extension && (
                    <CurriculumItem
                      key={`curr-item-${i}`}
                      title={child.name}
                      type={item.type}
                      timeLength={convertHMS(child.custom.duration)}
                    />
                  )
                );
              })}
            </Stack>
          </AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default CourseContent;
