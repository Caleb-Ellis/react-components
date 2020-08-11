import classNames from "classnames";
import PropTypes from "prop-types";
import React, { useState } from "react";
import type { ReactNode } from "react";

import type { NavigationBannerProps } from "../NavigationBanner";
import type { NavigationItemProps } from "../NavigationItem";
import NavigationBanner from "../NavigationBanner";
import NavigationGroup from "../NavigationGroup";
import NavigationItem from "../NavigationItem";
import NavigationItemContainer from "../NavigationItemContainer";

type BannerProps = Omit<
  NavigationBannerProps,
  "mobileMenuOpen" | "setMobileMenuOpen"
>;

type ItemProps = NavigationItemProps[] | NavigationItemProps[][];

type Props = {
  banner?: BannerProps;
  children?: ReactNode;
  className?: string;
  dark?: boolean;
  fullWidth?: boolean;
  items?: ItemProps;
};

const generateNav = (
  bannerProps: BannerProps,
  dark: Props["dark"],
  items: ItemProps,
  mobileMenuOpen: boolean,
  setMobileMenuOpen: (open: boolean) => void
): JSX.Element => {
  // Generate nav groups. If items prop is an array of items, but not an array
  // of an array of items, convert to an array of arrays of length 1.
  const groups = items.some((item: unknown) => !Array.isArray(item))
    ? [items as NavigationItemProps[]]
    : (items as NavigationItemProps[][]);

  return (
    <>
      <NavigationBanner
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        {...bannerProps}
      />
      <NavigationItemContainer mobileMenuOpen={mobileMenuOpen}>
        {groups.map((group, i) => (
          <NavigationGroup key={`nav-group-${i}`}>
            {group.map((item, j) => (
              <NavigationItem
                dark={dark}
                key={`nav-item-${i}-${j}`}
                {...item}
              />
            ))}
          </NavigationGroup>
        ))}
      </NavigationItemContainer>
    </>
  );
};

export const Navigation = ({
  banner,
  children,
  className,
  dark = false,
  fullWidth = false,
  items,
}: Props): JSX.Element => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header
      id="navigation"
      className={classNames("p-navigation", className, { "is-dark": dark })}
    >
      <div
        className={
          fullWidth ? "p-navigation__row--full-width" : "p-navigation__row"
        }
      >
        {children ||
          generateNav(banner, dark, items, mobileMenuOpen, setMobileMenuOpen)}
      </div>
    </header>
  );
};

Navigation.propTypes = {
  banner: PropTypes.object,
  children: PropTypes.node,
  className: PropTypes.string,
  dark: PropTypes.bool,
  fullWidth: PropTypes.bool,
  items: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)),
  ]),
};

export default Navigation;
