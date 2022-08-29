import { ButtonProps, MenuItemProps } from "@chakra-ui/react";

export type VideoControlButtonProps = ButtonProps & {
  toolLabel?: string;
};

export type VideoRateItemProps = MenuItemProps & { rate: number };
