import React from "react";

import Head from "next/head";
import PrivateTemplate from "../../../../templates/PrivateTemplate";
import AccessTemplate from "../../../../templates/AccessTemplate";
import DashboardLayout from "../../../../components/layouts/DashboardLayout";
import SingleAssignmentForInstructor from "../../../../components/pages/dashboard/instructor/one-page-assignment/SingleAssignmentForInstructor"

export default function index() {
  return (
    <PrivateTemplate>
      <AccessTemplate accessRoles={["instructor", "superAdmin","admin"]}>
        <Head>
          <title>Instructor | Think Trail</title>
        </Head>
        <DashboardLayout>
          <SingleAssignmentForInstructor/>
        </DashboardLayout>
      </AccessTemplate>
    </PrivateTemplate>
  );
}
