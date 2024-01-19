import React, { ReactElement } from "react";

import { PositionType } from "../../types";
import { whiteText } from "../../utils/colours.utils";
import { IconProps, Icon, TagProps, Tag } from "..";

import * as Chakra from "@chakra-ui/react";

export interface ButtonIconProps extends IconProps {
  position?: PositionType;
}

export interface ButtonLinkProps extends Chakra.LinkProps {
  href: string;
  download?: boolean | string;
}

export interface ButtonProps
  extends Omit<Chakra.ButtonProps, "leftIcon" | "rightIcon"> {
  icon?: ButtonIconProps;
  tooltip?: Omit<Chakra.TooltipProps, "children">;
  link?: ButtonLinkProps;
  notification?: TagProps;
}

const ButtonComponent = ({
  children,
  variant,
  icon,
  link,
  notification,
  isLoading,
  isDisabled,
  ...props
}: Omit<ButtonProps, "tooltip">): ReactElement<ButtonProps> => {
  if (icon && !children) {
    return (
      <Chakra.Box position={"relative"} role="button">
        <Chakra.IconButton
          as={link ? Chakra.Link : undefined}
          variant={variant}
          aria-label={icon.ariaLabel}
          icon={<Icon {...icon} />}
          href={link ? link.href : undefined}
          download={link?.download ? link.download : undefined}
          isLoading={isLoading}
          isDisabled={isDisabled}
          {...props}
        />
        {notification && !isLoading && (
          <Tag
            data-label="notification"
            position="absolute"
            right="-8px"
            top="-6px"
            borderRadius={20}
            colorScheme="red"
            color={whiteText}
            {...notification}
            variant={
              isDisabled
                ? "subtle"
                : notification.variant
                  ? notification.variant
                  : "solid"
            }
          />
        )}
      </Chakra.Box>
    );
  }

  return (
    <Chakra.Box position={"relative"} role="button">
      <Chakra.Button
        as={link ? Chakra.Link : undefined}
        variant={variant}
        leftIcon={
          icon?.position === "left" || (icon && !icon.position) ? (
            <Icon {...icon} />
          ) : undefined
        }
        rightIcon={icon?.position === "right" ? <Icon {...icon} /> : undefined}
        href={link ? link.href : undefined}
        download={link?.download ? link.download : undefined}
        isLoading={isLoading}
        isDisabled={isDisabled}
        {...props}
      >
        {children}
      </Chakra.Button>
      {notification && !isLoading && (
        <Tag
          data-label="notification"
          position="absolute"
          right="-8px"
          top="-6px"
          borderRadius={20}
          {...notification}
          variant={isDisabled ? "subtle" : notification.variant}
        />
      )}
    </Chakra.Box>
  );
};

export const Button = ({ tooltip, ...props }: ButtonProps) => {
  if (tooltip) {
    return (
      <Chakra.Tooltip {...tooltip}>
        <span>
          <ButtonComponent {...props} />
        </span>
      </Chakra.Tooltip>
    );
  }

  return <ButtonComponent {...props} />;
};
