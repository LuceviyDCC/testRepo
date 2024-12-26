import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { SpinLoading } from "antd-mobile";

const Layout: React.FC = () => {
  return (
    <>
      <div className="layout">
        <Suspense fallback={<SpinLoading />}>
          <Outlet></Outlet>
        </Suspense>
      </div>
    </>
  );
};

export default Layout;
