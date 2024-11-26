import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/navigation/Sidebar";

const RootLayout: React.FC = () => {
  const profile =  useProfile()
  return (
    <>
      <Sidebar />
      <Outlet />
    </>
  );
};

export default RootLayout;
