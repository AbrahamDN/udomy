import React, { useContext } from "react";
import {
  Button,
  Container,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  Tooltip,
} from "@chakra-ui/react";
import VideoContext from "../../../../context/video.context";
import { PauseIcon, PlayIcon, RewindIcon } from "../../Icons";
import {
  usePaused,
  useVideoHoverActive,
  useVideoRate,
} from "../../../globalStates";
import VideoControlButton from "./VideoControlButton";
import VideoRateItem from "./VideoRateItem";

const VideoControls = () => {
  const { togglePlay, skip } = useContext(VideoContext).functions;
  const setHoverActive = useVideoHoverActive()[1];
  const [paused] = usePaused();
  const [speedRate] = useVideoRate();

  const iconSize = { w: "8", h: "8" };

  return (
    <Container maxW="full" position="absolute" bottom="0">
      <Flex w="full" h="1.5" bgColor="brand"></Flex>

      <Flex
        onMouseEnter={() => setHoverActive(false)}
        onMouseLeave={() => setHoverActive(true)}
        w="full"
        h="12"
        alignItems="center"
      >
        <VideoControlButton onClick={togglePlay}>
          {paused ? <PlayIcon {...iconSize} /> : <PauseIcon w="7" h="7" />}
        </VideoControlButton>

        <VideoControlButton onClick={() => skip(-5)}>
          <RewindIcon w="6" h="6" />
        </VideoControlButton>

        <Menu>
          <Tooltip
            label="Playback rate"
            placement="top"
            bgColor="black"
            borderRadius="0"
            border="1px solid"
            borderColor="whiteAlpha.500"
            p="2"
            mb="4"
          >
            <MenuButton
              as={Button}
              h="fit-content"
              w="12"
              px="1"
              py="0.5"
              borderRadius="0"
              bgColor="white"
              color="black"
              fontWeight="bold"
              fontSize="sm"
              _hover={{ bgColor: "white" }}
              _focus={{ bgColor: "white" }}
            >
              {speedRate}x
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
            <VideoRateItem rate={0.5} />
            <VideoRateItem rate={0.75} />
            <VideoRateItem rate={1} />
            <VideoRateItem rate={1.25} />
            <VideoRateItem rate={1.75} />
            <VideoRateItem rate={2} />
          </MenuList>
        </Menu>

        <VideoControlButton onClick={() => skip(5)}>
          <RewindIcon w="6" h="6" transform="scaleX(-1)" />
        </VideoControlButton>
      </Flex>
    </Container>
  );
};

export default VideoControls;
