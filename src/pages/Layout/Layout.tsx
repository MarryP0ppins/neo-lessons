import { classname } from "@/utils";
import type React from "react";
import { NavLink } from "react-router";

import classes from "./styles.module.scss";

const cnLayout = classname(classes, "layout");

type LayoutType = React.PropsWithChildren & {
  title: string;
};
export const Layout: React.FC<LayoutType> = ({ children, title }) => {
  return (
    <div className={cnLayout("wrapper")}>
      <NavLink to="/">На главную</NavLink>
      <h2>{title}</h2>
      {children}
    </div>
  );
};
