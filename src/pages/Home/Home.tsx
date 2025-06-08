import type React from "react";
import { NavLink } from "react-router";
import { CONFIG, type NavConfig } from "@/config";

const renderPageSection = (config: NavConfig[], path: string[]) => {
  return (
    <ol>
      {config.map((nav) => {
        const currentPath = path.concat(nav.path);
        const currentLink = `/${currentPath.join("/")}`;
        if (nav.subpath) {
          return (
            <li key={currentLink}>
              {nav.title}
              <ol>{renderPageSection(nav.subpath, currentPath)}</ol>
            </li>
          );
        }
        return (
          <li key={currentLink}>
            <NavLink to={currentLink}>{nav.title}</NavLink>
          </li>
        );
      })}
    </ol>
  );
};

export const Home: React.FC = () => {
  return (
    <>
      <h1>Продвинутый курс по анимациям и UX в React 18</h1>
      {renderPageSection(CONFIG, [])}
    </>
  );
};
