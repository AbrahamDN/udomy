import React, { useContext } from "react";
import { Button, ButtonProps, Container, Flex } from "@chakra-ui/react";
import VideoOverlayGradient from "../VideoOverlay/VideoOverlayGradient";
import VideoContext from "../../../../context/video.context";
import { PauseIcon, PlayIcon } from "../../Icons";
import { usePaused } from "..";
import { useVideoHoverActive } from "../VideoOverlay";

const IconButton = (props: ButtonProps) => {
  const pseudoStyles = { bgColor: "transparent", opacity: 1 };
  return (
    <Button
      bgColor="transparent"
      opacity={0.8}
      p="0"
      m="0"
      _hover={pseudoStyles}
      _focus={pseudoStyles}
      sx={{
        "& > svg": {
          w: "8",
          h: "8",
        },
      }}
      {...props}
    />
  );
};

const VideoControls = () => {
  const { togglePlay } = useContext(VideoContext).functions;
  const [paused] = usePaused();
  const setHoverActive = useVideoHoverActive()[1];

  return (
    <VideoOverlayGradient
      position="absolute"
      bottom="0"
      alignItems="flex-end"
      flip
    >
      <Container maxW="full">
        <Flex w="full" h="1.5" bgColor="brand"></Flex>

        <Flex
          w="full"
          h="12"
          onMouseEnter={() => setHoverActive(false)}
          onMouseLeave={() => setHoverActive(true)}
        >
          <IconButton onClick={() => togglePlay}>
            {paused ? <PlayIcon /> : <PauseIcon />}
          </IconButton>
        </Flex>
      </Container>
    </VideoOverlayGradient>
  );
};

export default VideoControls;
