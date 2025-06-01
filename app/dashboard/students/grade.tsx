import Head from "next/head";
import React from "react";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import Grade from "../../../components/pages/dashboard/instructor/others/student/Grade";
import PrivateTemplate from "../../../templates/PrivateTemplate";
import AccessTemplate from "../../../templates/AccessTemplate";

const grade = () => {
  return (
    <PrivateTemplate>
      <AccessTemplate accessRoles={["student", "superAdmin"]}>
        <Head>
          <title>Student Grade</title>
        </Head>
        <DashboardLayout>
          <Grade />
        </DashboardLayout>
      </AccessTemplate>
    </PrivateTemplate>
  );
};

export default grade;
