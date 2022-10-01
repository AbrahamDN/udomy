import React, { useState, useEffect, useContext } from "react";
import { Flex, FlexProps, Text } from "@chakra-ui/react";
import {
  useCaptionOpacity,
  useCaptionSize,
  useVideoCaption,
  useVideoSubtitles,
} from "../../../globalStates";
import VideoContext from "../../../../context/video.context";

export const captionFontSizes = [
  { title: "50%", value: "xs" },
  { title: "75%", value: "sm" },
  { title: "100%", value: "md" },
  { title: "150%", value: "2xl" },
  { title: "200%", value: "3xl" },
];

export const captionBgOpacity = [
  { title: "0%", value: "0" },
  { title: "25%", value: "300" },
  { title: "50%", value: "600" },
  { title: "75%", value: "800" },
  { title: "100%", value: "black" },
];

const VideoCaptions = (props: FlexProps) => {
  const video = useContext(VideoContext).videoRef?.current;
  const { subtitles } = useContext(VideoContext).subtitlesState;
  const [caption] = useVideoCaption();
  const [fontSize] = useCaptionSize();
  const [bgOpacity] = useCaptionOpacity();
  const [subtitle, setSubtitle] = useState("");
  const currentTime = parseFloat(video?.currentTime.toFixed(3));

  useEffect(() => {
    const subtitleObj = subtitles?.find(({ data }) => {
      const start = data.start / 1000;
      const end = data.end / 1000;

      return currentTime >= start && currentTime <= end;
    });
    if (subtitleObj) setSubtitle(subtitleObj.data.text);
  }, [currentTime]);

  if (!caption) return null;
  return (
    <Flex
      position="absolute"
      bottom="16"
      bgColor={bgOpacity === "black" ? bgOpacity : `blackAlpha.${bgOpacity}`}
      p="2"
      w="auto"
      maxW="80%"
      {...props}
    >
      <Text fontSize={{ base: "md", md: fontSize }} userSelect="none">
        {subtitle}
      </Text>
    </Flex>
  );
};

export default VideoCaptions;
