import React from "react";
import Head from "next/head";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import Statistics from "../../components/pages/dashboard/instructor/statistics/index";
import PrivateTemplate from "../../templates/PrivateTemplate";
import AccessTemplate from "../../templates/AccessTemplate";

export default function statistics() {
  return (
    <PrivateTemplate>
      <AccessTemplate accessRoles={["instructor", "superAdmin"]}>
        <Head>
          <title>Instructor | Think Trail</title>
        </Head>
        <DashboardLayout>
          <Statistics />
        </DashboardLayout>
      </AccessTemplate>
    </PrivateTemplate>
  );
}
