import React, { useEffect, useState } from "react";
import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tooltip,
} from "@chakra-ui/react";
import { CaptionIcon } from "../../Icons";
import { useVideoCaption } from "../../../globalStates";
import { useLocalStorage } from "react-use";
import VideoControlButton from "./VideoControlButton";

const VideoControlCaption = () => {
  const [caption, setCaption] = useVideoCaption();
  const [localCaption, setLocalCaption] = useLocalStorage("caption", false);

  const handleMenuItemClick = (captionOn: boolean) => {
    setCaption(captionOn);
  };

  useEffect(() => {
    setLocalCaption(caption);
  }, [caption]);

  return (
    <Menu>
      <Tooltip label="Captions" placement="top" p="2" mb="4">
        <MenuButton as={VideoControlButton} border="none">
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
          onClick={() => handleMenuItemClick(false)}
          px="8"
          bgColor="transparent"
          _hover={{ bgColor: "whiteAlpha.300" }}
          _focus={{ bgColor: "black_80" }}
        >
          Off
        </MenuItem>
        <MenuItem
          onClick={() => handleMenuItemClick(true)}
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
