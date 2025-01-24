import React from "react";

import Head from "next/head";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import SingleAssignmentForInstructor from "../../../components/pages/dashboard/instructor/one-page-assignment/SingleAssignmentForInstructor";
import PrivateTemplate from "../../../templates/PrivateTemplate";
import AccessTemplate from "../../../templates/AccessTemplate";

export default function index() {
  return (
    <PrivateTemplate>
      <AccessTemplate accessRole={["instructor"]}>
        <Head>
          <title>Instructor | Fourth IT Academy</title>
        </Head>
        <DashboardLayout>
          <SingleAssignmentForInstructor />
        </DashboardLayout>
      </AccessTemplate>
    </PrivateTemplate>
  );
}