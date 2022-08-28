import { useEventListener } from "@chakra-ui/react";
import React from "react";
import { useVideoKeyPressProps } from "./useVideoKeyPress.types";

const useVideoKeyPress = (functions: useVideoKeyPressProps) => {
  const {
    togglePlay,
    toggleFullScreen,
    toggleTheatre,
    toggleMiniPlayer,
    toggleMute,
    skip,
    toggleCaptions,
  } = functions;

  const onKeyDown = (e: KeyboardEvent) => {
    switch (e.key.toLowerCase()) {
      case " ":
      case "k":
      case "p":
        e.preventDefault();
        console.info(e.key);
        if (togglePlay) togglePlay();
        break;
      case "f":
        if (toggleFullScreen) toggleFullScreen();
        break;
      case "t":
        if (toggleTheatre) toggleTheatre();
        break;
      case "i":
        if (toggleMiniPlayer) toggleMiniPlayer();
        break;
      case "m":
        if (toggleMute) toggleMute();
        break;
      case "arrowleft":
      case "j":
        if (skip) skip(-5);
        break;
      case "arrowright":
      case "l":
        if (skip) skip(5);
        break;
      case "c":
        if (toggleCaptions) toggleCaptions();
        break;
    }
  };
  useEventListener("keydown", onKeyDown);
  return;
};

export default useVideoKeyPress;
