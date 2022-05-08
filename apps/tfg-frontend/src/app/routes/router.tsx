import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routeConfig } from "./routerConfig";

export const ApplicationRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        { routeConfig.map((route, index) => (
            <Route key={index} {...route} /> )
          )
        }
      </Routes>
    </BrowserRouter>
  )
}
