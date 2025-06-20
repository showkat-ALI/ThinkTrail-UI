import Head from "next/head";
import React from "react";
import Signin from "../../components/pages/signin/page";

const SigninPage = () => {
  return (
    <>
      <Head>
        <title> Signin | Think Trail</title>
      </Head>
      <Signin/>
    </>
  );
};

export default SigninPage;
