import React from "react";
import Head from "next/head";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import AllStudent from "../../../components/pages/dashboard/instructor/student/AllStudent";
import PrivateTemplate from "../../../templates/PrivateTemplate";
import AccessTemplate from "../../../templates/AccessTemplate";

export default function All() {
  return (
    <PrivateTemplate>
      <AccessTemplate accessRoles={["instructor", "superAdmin"]}>
        <Head>
          <title>All Student | Think Trail</title>
        </Head>
        <DashboardLayout>
          <AllStudent />
        </DashboardLayout>
      </AccessTemplate>
    </PrivateTemplate>
  );
}
