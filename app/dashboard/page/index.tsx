import React from "react";
import Head from "next/head";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import Allpage from "../../../components/pages/dashboard/instructor/page-creation/allPage";
import PrivateTemplate from "../../../templates/PrivateTemplate";
import AccessTemplate from "../../../templates/AccessTemplate";

export default function index() {
  return (
    <PrivateTemplate>
      <AccessTemplate accessRoles={["instructor", "student", "superAdmin"]}>
        <Head>
          <title>Pages | Think Trail</title>
        </Head>
        <DashboardLayout>
          <Allpage />
        </DashboardLayout>
      </AccessTemplate>
    </PrivateTemplate>
  );
}
