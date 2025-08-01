import React from "react";
import Head from "next/head";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import PageCreation from "../../../components/pages/dashboard/stundent-self/page-course/overview";
import PrivateTemplate from "../../../templates/PrivateTemplate";
import AccessTemplate from "../../../templates/AccessTemplate";

export default function index() {
  return (
    <PrivateTemplate>
      <AccessTemplate accessRoles={["instructor", "student", "superAdmin"]}>
        <Head>
          <title>Page | Think Trail</title>
        </Head>
        <DashboardLayout>
          <PageCreation />
        </DashboardLayout>
      </AccessTemplate>
    </PrivateTemplate>
  );
}
