import { createGlobalState } from "react-use";
import { VideoOverlayIconNames } from "../components/Video/VideoOverlay/VideoOrverlay.types";

export const //
  // Sidebar
  useSidebar = createGlobalState(false),
  // Video
  useHover = createGlobalState(false),
  usePaused = createGlobalState(false),
  useVideoControlTriggered = createGlobalState(false),
  useVideoFirstMount = createGlobalState(false),
  useVideoHoverActive = createGlobalState(true),
  useVideoLoading = createGlobalState(true),
  useVideoOverlayIcon = createGlobalState<VideoOverlayIconNames>();