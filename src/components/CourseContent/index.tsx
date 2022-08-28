import React from "react";
import { COURSE_CONTENT_DATA as data } from "../../data";

import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  Stack,
} from "@chakra-ui/react";
import SectionButton from "./SectionButton";
import CurriculumItem from "./CurriculumItem";

const CourseContent = () => {
  return (
    <Accordion defaultIndex={[0]} allowMultiple>
      {data.map((data, idx) => (
        <AccordionItem key={`item-${idx}`} borderColor="gray.300">
          <SectionButton
            title={data.title}
            itemsCompleted={data.itemsCompleted}
            itemsCount={data.itemsCount}
            timeLength="12min"
          />

          <AccordionPanel p={0}>
            <Stack spacing={0} direction="column">
              {data.children.map((child, i) => (
                <CurriculumItem
                  key={`idx-${i}`}
                  title={child.title}
                  type={child.type}
                  timeLength={child.timeLength}
                />
              ))}
            </Stack>
          </AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default CourseContent;
