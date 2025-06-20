import React from "react";
import Head from "next/head";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import AllAssingments from "../../../components/pages/dashboard/instructor/all-assignments/submitassignmentall";
import PrivateTemplate from "../../../templates/PrivateTemplate";
import AccessTemplate from "../../../templates/AccessTemplate";

export default function index() {
  return (
    <>
      <PrivateTemplate>
        <AccessTemplate accessRoles={["instructor", "superAdmin"]}>
          <Head>
            <title>Submitted Assignments | Think Trail</title>
          </Head>
          <DashboardLayout>
            <AllAssingments />
          </DashboardLayout>
        </AccessTemplate>
      </PrivateTemplate>
    </>
  );
}
