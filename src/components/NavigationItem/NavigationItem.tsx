import classNames from "classnames";
import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import type { ComponentType, ElementType, ReactNode } from "react";

import type { NavigationSubnavItemProps } from "../NavigationSubnavItem";
import NavigationSubnavItem from "../NavigationSubnavItem";

export type Props = {
  children: ReactNode;
  className?: string;
  component?: ComponentType | ElementType;
  dark?: boolean;
  selected?: boolean;
  subnav?: {
    align?: "left" | "right";
    items: NavigationSubnavItemProps[];
  };
};

export const NavigationItem = ({
  children,
  className,
  component: Component = "a",
  dark = false,
  selected = false,
  subnav,
  ...componentProps
}: Props): JSX.Element => {
  const wrapper = useRef(null);
  const [active, setActive] = useState(false);

  const handleClickOutside = (e) => {
    if (!wrapper?.current?.contains(e.target)) {
      setActive(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, false);
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
  }, []);

  if (subnav) {
    return (
      <li
        className={classNames("p-navigation__item p-subnav", className, {
          "is-active": active,
          "is-dark": dark,
        })}
        ref={wrapper}
      >
        <div
          className="p-navigation__link p-subnav__toggle"
          onClick={() => setActive(!active)}
          style={{ cursor: "pointer" }}
        >
          {children}
        </div>
        {active && (
          <ul
            className={
              subnav.align === "right"
                ? "p-subnav__items--right"
                : "p-subnav__items"
            }
          >
            {subnav.items.map((subnavProps, i) => (
              <NavigationSubnavItem key={`subnav-${i}`} {...subnavProps} />
            ))}
          </ul>
        )}
      </li>
    );
  }
  return (
    <li
      className={classNames("p-navigation__item", className, {
        "is-selected": selected,
      })}
    >
      <Component className="p-navigation__link" {...componentProps}>
        {children}
      </Component>
    </li>
  );
};

NavigationItem.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  component: PropTypes.elementType,
  selected: PropTypes.bool,
  subnav: PropTypes.shape({
    align: PropTypes.oneOf(["left", "right"]),
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
  }),
};

export default NavigationItem;
