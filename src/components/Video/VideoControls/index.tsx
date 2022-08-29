import React, { useContext } from "react";
import { Button, ButtonProps, Container, Flex } from "@chakra-ui/react";
import VideoContext from "../../../../context/video.context";
import { PauseIcon, PlayIcon, RewindIcon } from "../../Icons";
import { VideoOverlayIconNames } from "../VideoOverlay/VideoOrverlay.types";
import { usePaused, useVideoHoverActive } from "../../../globalStates";

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
      {...props}
    />
  );
};

const VideoControls = () => {
  const { togglePlay, skip } = useContext(VideoContext).functions;
  const [paused] = usePaused();
  const setHoverActive = useVideoHoverActive()[1];
  // const setVideoOverlayIcon = useVideoOverlayIcon()[1];

  const iconSize = { w: "8", h: "8" };

  const handleButtonClick = (
    func: (val?: any) => any,
    icon?: VideoOverlayIconNames
  ) => {
    // if (icon) setVideoOverlayIcon(icon);
    return func;
  };

  return (
    <Container maxW="full" position="absolute" bottom="0">
      <Flex w="full" h="1.5" bgColor="brand"></Flex>

      <Flex
        w="full"
        h="12"
        onMouseEnter={() => setHoverActive(false)}
        onMouseLeave={() => setHoverActive(true)}
      >
        <IconButton onClick={() => handleButtonClick(togglePlay())}>
          {paused ? <PlayIcon {...iconSize} /> : <PauseIcon w="7" h="7" />}
        </IconButton>

        <IconButton onClick={() => handleButtonClick(skip(-5), "backSkip")}>
          <RewindIcon w="7" h="7" />
        </IconButton>

        <IconButton onClick={() => handleButtonClick(skip(5), "forwardSkip")}>
          <RewindIcon w="7" h="7" transform="scaleX(-1)" />
        </IconButton>
      </Flex>
    </Container>
  );
};

export default VideoControls;
