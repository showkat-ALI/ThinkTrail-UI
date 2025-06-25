import React from "react";
import Head from "next/head";
import PrivateTemplate from "../../../../templates/PrivateTemplate";
import AccessTemplate from "../../../../templates/AccessTemplate";
import DashboardLayout from "../../../../components/layouts/DashboardLayout";
import AllAssignments from "../../../../components/pages/dashboard/instructor/all-assignments/index";


export default function index() {
  return (
    <>
    <PrivateTemplate>
      <AccessTemplate accessRoles={["instructor", "superAdmin","admin"]}>
        <Head>
          <title>All Assignments | Think Trail</title>
        </Head>
        <DashboardLayout>
          <AllAssignments />
        </DashboardLayout>
      </AccessTemplate>
    </PrivateTemplate>
    </>

  );
}
