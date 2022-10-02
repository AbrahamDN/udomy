import React, { useRef, useState } from "react";
import { useEvent } from "react-use";
import { Box, Checkbox, Flex, Text, useEventListener } from "@chakra-ui/react";
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
  const [checked, setChecked] = useState(false);
  const [focused, setFocused] = useState(false);
  const [hover, setHover] = useState(false);
  const ref = useRef<HTMLInputElement>();

  const handleKeyDown = (e: KeyboardEvent) =>
    e.key === "Enter" && setChecked((prev) => !prev);

  useEvent(
    "click",
    () => setChecked((prev) => !prev),
    ref?.current?.nextSibling
  );
  useEvent("keydown", handleKeyDown, ref?.current);

  return (
    <Checkbox
      ref={ref}
      isReadOnly
      isChecked={checked}
      colorScheme="schemeBlack"
      borderColor="dark"
      gap={2}
      alignItems="flex-start"
      px={4}
      py={2}
      bgColor="white"
      _hover={{ bgColor: "grey.100" }}
      sx={{
        ".chakra-checkbox__control": { mt: "1" },
        ".chakra-checkbox__label": { w: "full" },
      }}
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    >
      <Flex flex={1} direction="column">
        <Flex
          as="span"
          tabIndex={0}
          _focusVisible={{
            boxShadow: "outline",
            outline: "none",
          }}
        >
          <Text flex={1} as="span" fontSize="13.5px" lineHeight="1.5">
            {title}
          </Text>
        </Flex>
        <Flex
          flex={1}
          fontSize="xs"
          gap={1}
          color={hover ? "black" : "cloudGrey"}
          mt="2"
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
