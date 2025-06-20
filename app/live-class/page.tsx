import type { NextPage } from "next";
import Head from "next/head";
import LiveClass from "../../components/pages/liveClass";


const Students: NextPage = () => {
  return (
    <>
      <Head>
        <title>LIve Class | Think Trail</title>
      </Head>

      <LiveClass />
    </>
  );
};

export default Students;
