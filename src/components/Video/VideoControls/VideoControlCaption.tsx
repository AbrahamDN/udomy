import React, { useEffect, useState, useContext } from "react";
import {
  Flex,
  MenuDivider,
  MenuItem,
  MenuItemOption,
  MenuOptionGroup,
  Switch,
  Text,
} from "@chakra-ui/react";
import { CaptionIcon, CircleIcon } from "../../Icons";
import {
  useCaptionOpacity,
  useCaptionSize,
  useCaptionUnder,
  useVideoCaption,
} from "../../../globalStates";
import { useLocalStorage } from "react-use";
import VideoMenu from "../VideoMenu";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { captionBgOpacity, captionFontSizes } from "./VideoCaptions";
import VideoContext from "../../../../context/video.context";

type SettingProps = {
  title: string;
  defaultItem?: string;
  items: { title: string; value: string; onClick?: () => void }[];
};

const VideoControlCaption = () => {
  const { triggerControl } = useContext(VideoContext).functions;

  const [caption, setCaption] = useVideoCaption();
  const [captionSize, setCaptionSize] = useCaptionSize();
  const [captionOpacity, setCaptionOpacity] = useCaptionOpacity();
  const [captionUnder, setCaptionUnder] = useCaptionUnder();
  const [localCaption, setLocalCaption] = useLocalStorage("caption", false);
  const [localCaptionSize, setLocalCaptionSize] = useLocalStorage(
    "captionSize",
    "2xl"
  );
  const [localCaptionOpacity, setLocalCaptionOpacity] = useLocalStorage(
    "captionOpacity",
    "800"
  );
  const [localCaptionUnder, setLocalCaptionUnder] = useLocalStorage(
    "captionUnder",
    false
  );

  const [settingsOpen, setSettingsOpen] = useState(false);
  const [setting, setSetting] = useState<SettingProps>(undefined);
  const [settingValue, setSettingValue] = useState<string | string[]>();

  const handleMenuItemClick = (captionOn: boolean) => {
    setCaption(captionOn);
    triggerControl(captionOn ? "caption" : "captionOff");
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

  const settingTitle = (setting: SettingProps, value: string) =>
    setting.items.find((item) => item.value === value).title;

  const fontSizeSettings = {
    title: "Font size",
    defaultItem: captionSize,
    items: captionFontSizes.map((item) => ({
      ...item,
      onClick: () => setCaptionSize(item.value),
    })),
  };
  const bgOpacitySettings = {
    title: "Background opacity",
    defaultItem: captionOpacity,
    items: captionBgOpacity.map((item) => ({
      ...item,
      onClick: () => setCaptionOpacity(item.value),
    })),
  };

  const closeSettings = () => {
    setSettingsOpen(false);
    setSetting(undefined);
  };

  const openSetting = (setting: SettingProps) => {
    setSettingsOpen(true);
    if (setting) setSetting(setting);
  };

  const reset = () => {
    setCaptionSize("md");
    setCaptionOpacity("800");
    setCaptionUnder(false);
  };

  useEffect(() => {
    setCaption(localCaption);
    setCaptionSize(localCaptionSize);
    setCaptionOpacity(localCaptionOpacity);
    setCaptionUnder(localCaptionUnder);
  }, []);
  useEffect(() => {
    setLocalCaption(caption);
    setLocalCaptionSize(captionSize);
    setLocalCaptionOpacity(captionOpacity);
    setLocalCaptionUnder(captionUnder);
  }, [caption, captionSize, captionOpacity, captionUnder]);

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
        label="Caption"
        menuItems={!settingsOpen ? menuItems : null}
        defaultItem={defaultItem}
        onClose={closeSettings}
      >
        {!settingsOpen && (
          <MenuItem
            icon={<ChevronRightIcon w="5" h="5" />}
            onClick={() => setSettingsOpen(true)}
          >
            Caption settings
          </MenuItem>
        )}

        {settingsOpen && !setting && (
          <>
            <MenuItem
              className="row"
              icon={<ChevronLeftIcon w="5" h="5" />}
              onClick={() => closeSettings()}
            >
              Caption settings
            </MenuItem>

            <MenuDivider />

            <MenuItem
              icon={
                <Flex>
                  <Text as="span" fontSize="sm" color="whiteAlpha.600">
                    {settingTitle(fontSizeSettings, captionSize)}
                  </Text>
                  <ChevronRightIcon w="5" h="5" />
                </Flex>
              }
              onClick={() => openSetting(fontSizeSettings)}
            >
              Font size
            </MenuItem>

            <MenuItem
              icon={
                <Flex>
                  <Text as="span" fontSize="sm" color="whiteAlpha.600">
                    {settingTitle(bgOpacitySettings, captionOpacity)}
                  </Text>
                  <ChevronRightIcon w="5" h="5" />
                </Flex>
              }
              onClick={() => openSetting(bgOpacitySettings)}
            >
              Background opacity
            </MenuItem>

            <MenuItem
              className="row"
              justifyContent="space-between"
              onClick={() => {
                setCaptionUnder((prev) => !prev);
              }}
            >
              <Text as="span">Display under</Text>
              <Switch
                ml="2"
                readOnly
                isChecked={captionUnder}
                pointerEvents="none"
              />
            </MenuItem>

            <MenuItem className="row" onClick={reset}>
              Reset
            </MenuItem>
          </>
        )}

        {setting && (
          <>
            <MenuItem
              className="row"
              icon={<ChevronLeftIcon w="5" h="5" />}
              minW="48"
              onClick={() => {
                setSetting(undefined);
              }}
            >
              {setting.title}
            </MenuItem>

            <MenuDivider />

            <MenuOptionGroup
              defaultValue={setting.defaultItem}
              type="radio"
              onChange={(e) => setSettingValue(e)}
              value={settingValue}
            >
              {setting.items.map(({ title, value, onClick }, idx) => (
                <MenuItemOption
                  key={`menuItemOption-s-${idx}`}
                  value={value}
                  icon={<CircleIcon w="2" h="2" color="brand" />}
                  onClick={onClick}
                >
                  {title}
                </MenuItemOption>
              ))}
            </MenuOptionGroup>
          </>
        )}
      </VideoMenu>
    </Flex>
  );
};

export default VideoControlCaption;
