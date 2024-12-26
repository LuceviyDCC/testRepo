import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

import Layout from '@/components/layout';

import type { DataRouteObject } from "react-router-dom";

const Trade = lazy(() => import('@/pages/trade'));

// 页面
export const defaultRouteList: DataRouteObject[] = [];

// 主体页面
const mainRouteList: DataRouteObject = {
  id: "index",
  path: "/",
  element: (
    <>
      <Layout />
    </>
  ),
  children: [
    {
      id: 'tradePage',
      path: '/trade',
      element: <Trade />
    }
  ],
};

function getNotFoundRoute(defaultPath: string): DataRouteObject {
  return {
    id: "404",
    path: "*",
    element: <Navigate replace to={defaultPath} />,
  };
}

const router: ReturnType<typeof createBrowserRouter> = createBrowserRouter(
  [...defaultRouteList, getNotFoundRoute("/"), mainRouteList],
  {
    basename: "/",
  },
);

export default router;
