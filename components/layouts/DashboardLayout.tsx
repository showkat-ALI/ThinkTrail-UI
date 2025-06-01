import React from "react";
import { ICommon } from "../../interfaces/ICommon";
import AsideBar from "./Admin/AsideBar";
import Header from "./Admin/Header";
import Announce from "./Admin/Announce";
import Footer from "./Admin/Footer";

const DashboardLayout = ({ children }: ICommon) => {
  return (
    <>
      <div className="flex">
        <AsideBar />
        <div className="flex-1">
          <Header />
          <Announce />
          <main className="bg-[#F9F9F9] p-5 min-h-[100vh]">{children}</main>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
