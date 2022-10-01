import React from "react";
import { Button, ButtonProps, MenuButton, Tooltip } from "@chakra-ui/react";

type VideoRateButtonProps = ButtonProps & { label?: string };

const VideoRateButton = React.forwardRef((props: VideoRateButtonProps, ref) => (
  <Tooltip label={props.label} placement="top" p="2" mb="6">
    <MenuButton
      as={Button}
      h="fit-content"
      w="20"
      px="1"
      borderRadius="0"
      bg="white"
      color="black"
      fontWeight="bold"
      fontSize="sm"
      minW="14"
      {...props}
    />
  </Tooltip>
));

export default VideoRateButton;
