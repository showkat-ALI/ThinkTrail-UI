import React from "react";
import Head from "next/head";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import PrivateTemplate from "../../../templates/PrivateTemplate";
import AccessTemplate from "../../../templates/AccessTemplate";
import { Semester } from "../../../components/pages/dashboard/superAdmin/Semester/Semester";
function index() {
  return (
    <>
      <PrivateTemplate>
        <AccessTemplate accessRole={"superAdmin"}>
          <Head>
            <title>Instructor | Fourth IT Academy</title>
          </Head>
          <DashboardLayout>
            <Semester />
          </DashboardLayout>
        </AccessTemplate>
      </PrivateTemplate>
    </>
  );
}

export default index;
