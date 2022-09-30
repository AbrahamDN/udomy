import React, { useEffect, useState } from "react";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tooltip,
} from "@chakra-ui/react";
import { CaptionIcon } from "../../Icons";
import { useVideoCaption } from "../../../globalStates";
import { useLocalStorage } from "react-use";

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
        <MenuButton
          border="none"
          opacity={0.8}
          _hover={{ opacity: 1 }}
          _focus={{ opacity: 1 }}
        >
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
