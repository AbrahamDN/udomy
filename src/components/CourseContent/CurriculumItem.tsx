import React, { useRef, useState } from "react";
import { useEvent } from "react-use";
import { Checkbox, Flex, Text } from "@chakra-ui/react";
import { PageIcon, VideoIcon } from "../Icons";

type CurriculumItemProps = {
  title: string;
  type?: "video" | "page" | string;
  timeLength?: string;
  itemsCount?: number;
  itemsCompleted?: number;
  onClick?: () => void;
};

type KE = KeyboardEvent;

const CurriculumItem = ({
  title,
  type = "video",
  timeLength,
  onClick,
}: CurriculumItemProps) => {
  const [checked, setChecked] = useState(false);
  const setFocused = useState(false)[1];
  const [hover, setHover] = useState(false);
  const ref = useRef<HTMLInputElement>();
  const titleRef = useRef<HTMLDivElement>();

  const toggleChecked = () => setChecked((prev) => !prev);
  const handleKeyDown = (e: KeyboardEvent, action: () => void) =>
    e.key === "Enter" && action();

  useEvent("click", onClick, ref?.current);
  useEvent("click", toggleChecked, ref?.current?.nextSibling);
  useEvent("keydown", (e: KE) => handleKeyDown(e, toggleChecked), ref?.current);
  useEvent("keydown", (e: KE) => handleKeyDown(e, onClick), titleRef?.current);

  return (
    <Checkbox
      ref={ref}
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
          ref={titleRef}
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
