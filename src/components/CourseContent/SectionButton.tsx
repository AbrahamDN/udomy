import {
  AccordionButton,
  AccordionIcon,
  Box,
  Heading,
  Text,
} from "@chakra-ui/react";
import React from "react";

type SectionButtonProps = {
  title: string;
  timeLength?: string;
  itemsCount?: number;
  itemsCompleted?: number;
};

const SectionButton = ({
  title,
  timeLength,
  itemsCount,
  itemsCompleted,
}: SectionButtonProps) => {
  return (
    <AccordionButton py={4} bgColor="gray.50" _hover={{ bgColor: "gray.50" }}>
      <Box flex="1" textAlign="left">
        <Heading as="h3" fontWeight="bold" fontSize="md" noOfLines={1}>
          {title}
        </Heading>

        {(itemsCount || timeLength) && (
          <Box fontSize="xs" pt={1.5}>
            {itemsCount && (
              <Text as="span" letterSpacing={2.5}>
                {itemsCompleted + "/"}
                {itemsCount}
              </Text>
            )}
            {" | "}
            {timeLength && <Text as="span">{timeLength}</Text>}
          </Box>
        )}
      </Box>
      <AccordionIcon />
    </AccordionButton>
  );
};

export default SectionButton;
