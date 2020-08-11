import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import type { HTMLProps, ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
} & HTMLProps<HTMLUListElement>;

export const NavigationGroup = ({
  children,
  className,
  ...ulProps
}: Props): JSX.Element => {
  return (
    <ul className={classNames("p-navigation__items", className)} {...ulProps}>
      {children}
    </ul>
  );
};

NavigationGroup.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default NavigationGroup;
