import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import type { ComponentType, ElementType, ReactNode } from "react";

export type Props = {
  children: ReactNode;
  className?: string;
  component?: ComponentType | ElementType;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
};

export const NavigationBanner = ({
  children,
  className,
  component: Component = "a",
  mobileMenuOpen,
  setMobileMenuOpen,
  ...componentProps
}: Props): JSX.Element => {
  return (
    <div className="p-navigation__banner">
      <div className="p-navigation__logo">
        <Component
          className={classNames("p-navigation__item", className)}
          {...componentProps}
        >
          <div className="p-navigation__image u-vertically-center">
            {children}
          </div>
        </Component>
      </div>
      <div
        className="p-navigation__toggle--open"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        style={{ cursor: "pointer" }}
      >
        {mobileMenuOpen ? "Close menu" : "Menu"}
      </div>
    </div>
  );
};

NavigationBanner.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  component: PropTypes.elementType,
  mobileMenuOpen: PropTypes.bool.isRequired,
  setMobileMenuOpen: PropTypes.func.isRequired,
};

export default NavigationBanner;
