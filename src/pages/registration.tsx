import Head from "next/head";
import React from "react";
import HomeLayout from "../components/layouts/HomeLayout";
import BottomRegisForm from "../components/pages/registration/BottomRegisForm";
import DateTimeSection from "../components/pages/registration/DateTimeSection";
import MiddlePartRegistration from "../components/pages/registration/MiddlePartRegistration";
import Registration from "../components/pages/registration/Registration";
import TopPartRegistration from "../components/pages/registration/TopPartRegistration";

const registration = () => {
  return (
    <>
      <Head>
        <title> Registration | Fourth IT Academy</title>
      </Head>
      <HomeLayout>
        <Registration />
      </HomeLayout>
    </>
  );
};

export default registration;
