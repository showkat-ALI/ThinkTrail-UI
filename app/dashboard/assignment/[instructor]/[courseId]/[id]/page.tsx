import React from "react";

import Head from "next/head";
import DashboardLayout from "../../../../../../components/layouts/DashboardLayout";
import OnePageAssignment from "../../../../../../components/pages/dashboard/instructor/one-page-assignment/index";
import PrivateTemplate from "../../../../../../templates/PrivateTemplate";
import AccessTemplate from "../../../../../../templates/AccessTemplate";

export default function index() {
  return (
    <PrivateTemplate>
      <AccessTemplate accessRoles={["instructor", "student", "superAdmin","admitted"]}>
        <Head>
          <title>One Page Assignment | Think Trail</title>
        </Head>
        <DashboardLayout>
          <OnePageAssignment />
        </DashboardLayout>
      </AccessTemplate>
    </PrivateTemplate>
  );
}
