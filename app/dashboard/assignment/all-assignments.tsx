import React from "react";
import Head from "next/head";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
// import AllAssingments from "../../../components/pages/dashboard/instructor/all-assignments/index";
import PrivateTemplate from "../../../templates/PrivateTemplate";
import AccessTemplate from "../../../templates/AccessTemplate";
import AllAssignments from "../../../components/pages/dashboard/instructor/all-assignments/submitassignmentall";

export default function index() {
  return (
    <PrivateTemplate>
      <AccessTemplate accessRoles={["instructor", "student", "superAdmin"]}>
        <Head>
          <title>All Assignments | Fourth IT Academy</title>
        </Head>
        <DashboardLayout>
          <AllAssignments />
        </DashboardLayout>
      </AccessTemplate>
    </PrivateTemplate>
  );
}
