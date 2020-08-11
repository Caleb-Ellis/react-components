import PropTypes from "prop-types";
import React from "react";
import type { ComponentType, ElementType, ReactNode } from "react";

export type Props = {
  children: ReactNode;
  className?: string;
  component?: ComponentType | ElementType;
};

export const NavigationSubnavItem = ({
  children,
  className,
  component: Component = "a",
  ...componentProps
}: Props): JSX.Element => {
  return (
    <li className={className}>
      <Component className="p-subnav__item" {...componentProps}>
        {children}
      </Component>
    </li>
  );
};

NavigationSubnavItem.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  component: PropTypes.elementType,
};

export default NavigationSubnavItem;
