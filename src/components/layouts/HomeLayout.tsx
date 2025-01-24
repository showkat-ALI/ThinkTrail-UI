import React from "react";
import { ICommon } from "../../interfaces/ICommon";
import Footer from "../shared/Footer";
import Header from "../shared/Header";
import TopHeader from "../shared/TopHeader";

const HomeLayout = ({ children }: ICommon) => {
  return (
    <>
      <TopHeader />
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default HomeLayout;
