import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import type { HTMLProps, ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  mobileMenuOpen: boolean;
} & HTMLProps<HTMLElement>;

export const NavigationItemContainer = ({
  children,
  className,
  mobileMenuOpen,
  ...navProps
}: Props): JSX.Element => {
  return (
    <nav
      className={classNames("p-navigation__nav", className)}
      style={mobileMenuOpen ? { display: "flex" } : undefined}
      {...navProps}
    >
      {children}
    </nav>
  );
};

NavigationItemContainer.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  mobileMenuOpen: PropTypes.bool,
};

export default NavigationItemContainer;
