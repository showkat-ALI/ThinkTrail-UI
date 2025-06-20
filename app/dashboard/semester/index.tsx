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
        <AccessTemplate accessRoles={["superAdmin"]}>
          <Head>
            <title>Instructor | Think Trail</title>
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
