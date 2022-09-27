import React from "react";
import { COURSE_CONTENT_DATA } from "../../data";

import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  Stack,
} from "@chakra-ui/react";
import SectionButton from "./SectionButton";
import CurriculumItem from "./CurriculumItem";
import { useCourseData } from "../../globalStates";

function convertHMS(d: string) {
  d = Number(d);
  const h = Math.floor(d / 3600);
  const m = Math.floor((d % 3600) / 60);
  const s = Math.floor((d % 3600) % 60);

  const hDisplay = h > 0 ? h + (h == 1 ? " hr, " : " hrs, ") : "";
  const mDisplay = m > 0 ? m + (m == 1 ? " min " : " mins ") : "";
  return hDisplay + mDisplay;
}

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
            title="00 - Section"
            itemsCompleted={0}
            itemsCount={courseRootFiles?.length || 0}
            // timeLength={convertHMS(data.custom.duration)}
          />

          <AccordionPanel p={0}>
            <Stack spacing={0} direction="column">
              {courseRootFiles.map(
                (data, i) =>
                  data.extension === ".mp4" && (
                    <CurriculumItem
                      key={`curr-item-${i}`}
                      title={data.name}
                      type={"video"}
                      timeLength={convertHMS(data.custom.duration)}
                    />
                  )
              )}
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
              {data.children.map(
                (child, i) =>
                  child.extension === ".mp4" && (
                    <CurriculumItem
                      key={`curr-item-${i}`}
                      title={child.name}
                      type={"video"}
                      timeLength={convertHMS(child.custom.duration)}
                    />
                  )
              )}
            </Stack>
          </AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default CourseContent;
