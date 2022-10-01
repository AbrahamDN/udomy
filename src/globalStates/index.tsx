import { createGlobalState } from "react-use";
import { VideoOverlayIconNames } from "../components/Video/VideoOverlay/VideoOrverlay.types";

type CourseData = {
  children: any[];
};

export const //
  useCourseData = createGlobalState<CourseData>(),
  // Sidebar
  useSidebar = createGlobalState(false),
  // Video
  useHover = createGlobalState(false),
  usePaused = createGlobalState(false),
  useVideoControlTriggered = createGlobalState(false),
  useVideoCurrentTime = createGlobalState(""),
  useVideoFirstMount = createGlobalState(false),
  useVideoHoverActive = createGlobalState(true),
  useVideoLoading = createGlobalState(true),
  useVideoOverlayIcon = createGlobalState<VideoOverlayIconNames>(),
  useVideoRate = createGlobalState(1),
  useVideoVolume = createGlobalState(1),
  useVideoSubtitles = createGlobalState([]),
  useVideoCaption = createGlobalState(false),
  useCaptionSize = createGlobalState("md"),
  useCaptionOpacity = createGlobalState("800"),
  useCaptionUnder = createGlobalState(false);
