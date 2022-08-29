import React from "react";
import { Flex, FlexProps } from "@chakra-ui/react";

type VideoOverlayGradientProps = FlexProps & {
  children?: any;
  flip?: boolean;
  opacity?: number | {};
  transition?: string | {};
};

const bgGradient =
  "linear-gradient(to bottom,rgba(20,23,28,0.9) 0%,rgba(20,23,28,0.738) 19%,rgba(20,23,28,0.541) 34%,rgba(20,23,28,0.382) 47%,rgba(20,23,28,0.278) 56.5%,rgba(20,23,28,0.194) 65%,rgba(20,23,28,0.126) 73%,rgba(20,23,28,0.075) 80.2%,rgba(20,23,28,0.042) 86.1%,rgba(20,23,28,0.021) 91%,rgba(20,23,28,0.008) 95.2%,rgba(20,23,28,0.002) 98.2%,rgba(20,23,28,0) 100%)";

const VideoOverlayGradient = ({
  children,
  flip,
  ...otherProps
}: VideoOverlayGradientProps) => {
  return (
    <Flex
      transform={flip ? "rotateX(180deg)" : ""}
      w="full"
      h="7.8rem"
      bgGradient={bgGradient}
      {...otherProps}
    >
      {children}
    </Flex>
  );
};

export default VideoOverlayGradient;
