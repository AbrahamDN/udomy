import React from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItemOption,
  MenuOptionGroup,
  MenuDivider,
  Button,
  ComponentWithAs,
  ButtonProps,
  Tooltip,
} from "@chakra-ui/react";
import { CircleIcon } from "../Icons";

type VideoMenuProps = {
  defaultItem?: string;
  children?: any;
  title?: string | number | React.ReactElement;
  label?: string;
  menuButtonAs?: ComponentWithAs<"button", ButtonProps>;
  menuItems?: {
    title: string | number;
    value: string;
    onClick?: () => void;
  }[];
  onClose?: () => void;
};

const VideoMenu = ({
  defaultItem,
  title,
  label,
  menuButtonAs,
  menuItems,
  children,
  onClose,
}: VideoMenuProps) => {
  return (
    <Menu
      closeOnSelect={false}
      isLazy
      placement="top"
      eventListeners={false}
      flip={false}
      onClose={onClose}
    >
      <Tooltip
        label={!menuButtonAs ? label : null}
        placement="top"
        p="2"
        mb="4"
      >
        <MenuButton
          as={menuButtonAs || Button}
          label={label}
          className="menu__button"
          bgColor="transparent"
          border="none"
          p="0"
        >
          {title || "Open"}
        </MenuButton>
      </Tooltip>

      <MenuList
        minWidth="fit-content"
        bgColor="black"
        borderColor="whiteAlpha.500"
        borderRadius="0"
        fontSize={{ base: "xs", md: "sm" }}
        mb="4"
        sx={{
          ".chakra-menu__menuitem-option, .chakra-menu__menuitem": {
            pl: "8",
            pr: "4",
            py: "2.5",
            flexDirection: "row-reverse",
            "&:hover": { bgColor: "whiteAlpha.300" },
            "&:focus": { bgColor: "whiteAlpha.300" },
            "&.row": {
              flexDirection: "row",
              pl: "8",
              "& .chakra-menu__icon-wrapper, & .chakra-menu__icon-wrapper": {
                position: "absolute",
                left: "-1",
              },
            },
          },
          ".chakra-menu__icon-wrapper, .chakra-menu__icon-wrapper": {
            m: 0,
            ml: "3",
          },
        }}
      >
        {menuItems && (
          <MenuOptionGroup
            defaultValue={defaultItem || menuItems[0].value}
            type="radio"
          >
            {menuItems.map(({ title, value, onClick }, idx) => (
              <MenuItemOption
                key={`menuItemOption-${idx}`}
                value={value}
                icon={<CircleIcon w="2" h="2" color="brand" />}
                onClick={onClick}
              >
                {title}
              </MenuItemOption>
            ))}
          </MenuOptionGroup>
        )}

        {menuItems && children && <MenuDivider />}

        {children}
      </MenuList>
    </Menu>
  );
};

export default VideoMenu;
