import React, { useState, useEffect, useContext } from "react";
import { Flex, Text } from "@chakra-ui/react";
import { useVideoCaption } from "../../../globalStates";
import VideoContext from "../../../../context/video.context";

const VideoCaptions = () => {
  const video = useContext(VideoContext).videoRef?.current;
  const [caption] = useVideoCaption();
  const [subtitles, setSubtitles] = useState([]);
  const [subtitle, setSubtitle] = useState("");
  const currentTime = parseFloat(video?.currentTime.toFixed(3));

  const getSubtitles = async () => {
    const res = await fetch("/api/subtitle", {
      method: "POST",
      body: JSON.stringify({
        subtitle:
          "/course/01-Introduction/01- How Dropshipping Really Works-en.vtt",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setSubtitles(data);
  };

  useEffect(() => {
    getSubtitles();
  }, []);

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
      bgColor="blackAlpha.800"
      p="2"
      w="auto"
      maxW="80%"
    >
      <Text fontSize={{ base: "md", md: "lg", lg: "2xl" }} userSelect="none">
        {subtitle}
      </Text>
    </Flex>
  );
};

export default VideoCaptions;
