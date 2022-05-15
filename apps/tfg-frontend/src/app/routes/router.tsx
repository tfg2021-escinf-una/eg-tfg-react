import { BrowserRouter, Route, Routes } from "react-router-dom";
import { withBaseWrapper } from "../components/hoc/withBaseWrapper/withBaseWrapper";
import { routeConfig } from "./routerConfig";

const AppWrapper = withBaseWrapper(
  ({ children } : any) => {
    return (
      <>
        { children }
      </>
    )
  }
);

export const ApplicationRouter = () => {
  return (
    <BrowserRouter>
      <AppWrapper>
        <Routes>
          { routeConfig.map((route, index) => (
              <Route key={index} {...route} /> )
            )
          }
        </Routes>
      </AppWrapper>
    </BrowserRouter>
  )
};
