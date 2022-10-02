import React, { useEffect } from "react";
import { useVideoFullscreen } from "../../../globalStates";
import { FullscreenExitIcon, FullscreenIcon } from "../../Icons";
import { VideoOverlayIconNames } from "../VideoOverlay/VideoOrverlay.types";
import VideoControlButton from "./VideoControlButton";

type VideoFullscreenProps = {
  toggleFullScreen: () => any;
  triggerControl?: (icon?: VideoOverlayIconNames) => any;
};

const VideoFullscreen = ({
  toggleFullScreen,
  triggerControl,
}: VideoFullscreenProps) => {
  const [fullScreen, setFullScreen] = useVideoFullscreen();
  const isFullScreen =
    typeof window !== "undefined"
      ? Boolean(document?.fullscreenElement)
      : false;

  useEffect(() => {
    if (isFullScreen) setFullScreen(false);
    if (triggerControl)
      triggerControl(!isFullScreen ? "fullscreenExit" : "fullscreen");
  }, [isFullScreen, fullScreen]);

  return (
    <VideoControlButton
      toolLabel={fullScreen ? "Exit fullscreen" : "Fullscreen"}
      onClick={toggleFullScreen}
    >
      {fullScreen ? (
        <FullscreenExitIcon w="6" h="6" />
      ) : (
        <FullscreenIcon w="6" h="6" />
      )}
    </VideoControlButton>
  );
};

export default VideoFullscreen;
