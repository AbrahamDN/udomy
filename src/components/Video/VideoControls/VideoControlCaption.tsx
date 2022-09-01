import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tooltip,
} from "@chakra-ui/react";
import React from "react";
import { CaptionIcon } from "../../Icons";
import VideoControlButton from "./VideoControlButton";

const VideoControlCaption = () => {
  return (
    <Menu>
      <Tooltip label="Captions" placement="top" p="2" mb="4">
        <MenuButton as={Button} border="none">
          <CaptionIcon w="7" h="7" />
        </MenuButton>
      </Tooltip>

      <MenuList
        color="white"
        bgColor="black"
        borderRadius="0"
        border="1px solid"
        borderColor="whiteAlpha.500"
        fontSize="sm"
        mb="6"
        minW="min-content"
      >
        <MenuItem
          px="8"
          bgColor="transparent"
          _hover={{ bgColor: "transparent" }}
          _focus={{ bgColor: "transparent" }}
        >
          Off
        </MenuItem>
        <MenuItem
          px="8"
          bgColor="transparent"
          _hover={{ bgColor: "whiteAlpha.300" }}
          _focus={{ bgColor: "black_80" }}
        >
          English
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default VideoControlCaption;
