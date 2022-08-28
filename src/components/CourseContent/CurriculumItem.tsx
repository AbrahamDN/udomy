import { Checkbox, Flex, Stack, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { PageIcon, VideoIcon } from "../Icons";

type CurriculumItemProps = {
  title: string;
  type?: "video" | "page" | string;
  timeLength?: string;
  itemsCount?: number;
  itemsCompleted?: number;
};

const CurriculumItem = ({
  title,
  type = "video",
  timeLength,
}: CurriculumItemProps) => {
  const [hover, setHover] = useState(false);
  return (
    <Checkbox
      colorScheme="schemeBlack"
      borderColor="dark"
      gap={2}
      alignItems="flex-start"
      px={4}
      py={2}
      bgColor="white"
      _hover={{ bgColor: "grey.100" }}
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Flex flex={1} direction="column" gap={3}>
        <Text flex={1} as="span" fontSize="sm" lineHeight={1.05}>
          {title}
        </Text>
        <Flex
          flex={1}
          fontSize="xs"
          gap={1}
          color={hover ? "black" : "cloudGrey"}
        >
          {type === "video" ? (
            <VideoIcon w={4} h={4} />
          ) : (
            <PageIcon w={4} h={4} />
          )}{" "}
          <Text as="span">{timeLength}</Text>
        </Flex>
      </Flex>
    </Checkbox>
  );
};

export default CurriculumItem;
