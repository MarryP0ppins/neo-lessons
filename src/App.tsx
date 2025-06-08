import "./App.css";
import { Route, Routes } from "react-router";
import { Home, Layout } from "./pages";
import { CONFIG, type NavConfig } from "./config";

const renderPageSection = (config: NavConfig[], title: string[]) => {
  return (
    <>
      {config.map((nav) => {
        const newTitle = title.concat(nav.title);
        if (nav.subpath) {
          return (
            <Route path={nav.path}>
              {renderPageSection(nav.subpath, newTitle)}
            </Route>
          );
        }
        const layoutTitle = newTitle.join(". ");
        return (
          <Route
            path={nav.path}
            element={<Layout title={layoutTitle}>{nav.page?.()}</Layout>}
          />
        );
      })}
    </>
  );
};

function App() {
  return (
    <Routes>
      <Route index element={<Home />} />
      {renderPageSection(CONFIG, [])}
    </Routes>
  );
}

export default App;
