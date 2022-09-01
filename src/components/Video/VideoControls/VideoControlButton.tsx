import { Button, Tooltip } from "@chakra-ui/react";
import { VideoControlButtonProps } from "./VideoControls.types";

const VideoControlButton = ({
  toolLabel,
  ...props
}: VideoControlButtonProps) => {
  const pseudoStyles = { bgColor: "transparent", opacity: 1 };
  return (
    <Tooltip
      label={toolLabel}
      placement="top"
      bgColor="black"
      borderRadius="0"
      border="1px solid"
      borderColor="whiteAlpha.500"
      p="2"
      mb="2"
    >
      <Button
        variant="secondary"
        opacity={0.8}
        p="0"
        m="0"
        _hover={pseudoStyles}
        _focus={pseudoStyles}
        {...props}
      />
    </Tooltip>
  );
};

export default VideoControlButton;
