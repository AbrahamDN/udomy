import React, { useEffect } from "react";
import { Flex } from "@chakra-ui/react";
import { CaptionIcon } from "../../Icons";
import { useVideoCaption } from "../../../globalStates";
import { useLocalStorage } from "react-use";
import VideoMenu from "../VideoMenu";

const VideoControlCaption = () => {
  const [caption, setCaption] = useVideoCaption();
  const [localCaption, setLocalCaption] = useLocalStorage("caption", false);

  const handleMenuItemClick = (captionOn: boolean) => {
    setCaption(captionOn);
  };

  const menuItems = [
    {
      title: "Off",
      value: "off",
      onClick: () => handleMenuItemClick(false),
    },
    {
      title: "English",
      value: "english",
      onClick: () => handleMenuItemClick(true),
    },
  ];

  const defaultItem = menuItems[caption ? 1 : 0].value;

  useEffect(() => setCaption(localCaption), []);
  useEffect(() => {
    setLocalCaption(caption);
  }, [caption]);

  return (
    <Flex
      sx={{
        ".menu__button": {
          opacity: 0.8,
          "&:hover, &:focus": { opacity: 1 },
        },
      }}
    >
      <VideoMenu
        title={<CaptionIcon w="7" h="7" />}
        menuItems={menuItems}
        defaultItem={defaultItem}
      />
    </Flex>
  );
};

export default VideoControlCaption;
