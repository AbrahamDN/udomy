import React, { useState, useRef, useEffect } from "react";
import { Container, Flex, useBreakpointValue, VStack } from "@chakra-ui/react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import rehypeRaw from "rehype-raw";
import { useSidebar, useVideoFullscreen } from "../../globalStates";
import VideoFullscreen from "../Video/VideoControls/VideoFullscreen";
import VideoControlButton from "../Video/VideoControls/VideoControlButton";
import { ExpandIcon, ShrinkIcon } from "../Icons";

type PageContainerProps = {
  path: string;
};

const PageContainer = ({ path }: PageContainerProps) => {
  const [content, setContent] = useState("");
  const [sidebar, setSidebar] = useSidebar();
  const [fullscreen, setFullScreen] = useVideoFullscreen();
  const ref = useRef<HTMLDivElement>();

  const isLargeScreen = useBreakpointValue({ base: false, lg: true });

  const toggleFullScreen = () => {
    !document?.fullscreenElement
      ? ref.current?.requestFullscreen()
      : document.exitFullscreen();
    setFullScreen((prev) => !prev);
  };

  const getContent = async () => {
    try {
      const res = await fetch(path);
      const data = await res.text();
      setContent(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getContent();
  }, []);

  return (
    <Flex
      ref={ref}
      flex={1}
      flexDir="column"
      w="full"
      h="full"
      bg="white"
      color="black"
    >
      <VStack
        w="full"
        h="full"
        overflowY="auto"
        py="10"
        px={{ base: "10", md: "20" }}
      >
        <Container maxW="container.sm" overflowY="visible">
          {content && (
            <ReactMarkdown
              rehypePlugins={[rehypeRaw]}
              components={ChakraUIRenderer()}
              children={content}
            />
          )}
        </Container>
      </VStack>

      <Flex
        w="full"
        minH="10"
        px="4"
        borderY="1px solid"
        borderColor="chakra-border-color"
        justifyContent="flex-end"
        alignItems="center"
        sx={{ "& svg": { color: "black" } }}
      >
        <VideoFullscreen toggleFullScreen={toggleFullScreen} />

        {isLargeScreen && !fullscreen && (
          <VideoControlButton
            toolLabel={sidebar ? "Expanded view" : "Default view"}
            onClick={() => setSidebar((prev) => !prev)}
          >
            {sidebar ? <ExpandIcon w="6" h="6" /> : <ShrinkIcon w="6" h="6" />}
          </VideoControlButton>
        )}
      </Flex>
    </Flex>
  );
};

export default PageContainer;
