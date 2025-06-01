"use client"; // Should be at very top
import React from "react";
import { ICommon } from "../../interfaces/ICommon";
import Footer from "../shared/Footer";
import Header from "../shared/Header";
import TopHeader from "../shared/TopHeader";

const HomeLayout = ({ children }: ICommon) => {
  return (
    <div className="home-layout"> {/* Added container div */}
      <TopHeader />
      <Header />
      <main>{children}</main> {/* Wrapped children in main tag */}
      <Footer />
    </div>
  );
};

export default HomeLayout;