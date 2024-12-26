import { RouterProvider } from "react-router-dom";

import router from "./routerList";

const Router = () => {
  return <RouterProvider router={router}></RouterProvider>;
};

export default Router;
