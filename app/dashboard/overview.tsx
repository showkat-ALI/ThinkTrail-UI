import React from "react";
import Head from "next/head";
import PrivateTemplate from "../../templates/PrivateTemplate";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import InstructorOverview from "../../components/pages/dashboard/instructor/overview-instructor/page";
import AccessTemplate from "../../templates/AccessTemplate";

export default function overview() {
  return (
    <PrivateTemplate>
      <AccessTemplate accessRoles={["superAdmin"]}>
        <Head>
          <title>Instructor | Think Trail</title>
        </Head>

        <DashboardLayout>
          <InstructorOverview />
        </DashboardLayout>
      </AccessTemplate>
    </PrivateTemplate>
  );
}
