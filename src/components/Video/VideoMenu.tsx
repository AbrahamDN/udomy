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
} from "@chakra-ui/react";
import { CircleIcon } from "../Icons";

type VideoMenuProps = {
  defaultItem: string;
  children?: string | number | React.ReactElement;
  title?: string | number | React.ReactElement;
  label?: string;
  menuButtonAs?: ComponentWithAs<"button", ButtonProps>;
  menuItems?: {
    title: string | number;
    value: string;
    onClick?: () => void;
  }[];
};

const VideoMenu = ({
  defaultItem,
  title,
  label,
  menuButtonAs = Button,
  menuItems,
  children,
}: VideoMenuProps) => {
  return (
    <Menu closeOnSelect={false} isLazy>
      <MenuButton
        as={menuButtonAs}
        label={label}
        className="menu__button"
        bgColor="transparent"
        border="none"
        p="0"
      >
        {title || "Open"}
      </MenuButton>

      <MenuList
        minWidth="32"
        bgColor="black"
        borderColor="whiteAlpha.500"
        borderRadius="0"
        mb="4"
        sx={{
          ".chakra-menu__menuitem-option": {
            pl: "8",
            pr: "4",
            flexDirection: "row-reverse",
            "&:hover": { bgColor: "whiteAlpha.300" },
            "&:focus": { bgColor: "whiteAlpha.300" },
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
                icon={<CircleIcon w="2.5" h="2.5" color="brand" />}
                sx={{ ".chakra-menu__icon-wrapper": { m: 0, ml: "2" } }}
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
