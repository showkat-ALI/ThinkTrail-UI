import React from "react";
import AcademicDepartment from "../../../components/pages/dashboard/superAdmin/academicdepartment/AcademicDepartment";
import PrivateTemplate from "../../../templates/PrivateTemplate";
import AccessTemplate from "../../../templates/AccessTemplate";
import Head from "next/head";
import DashboardLayout from "../../../components/layouts/DashboardLayout";

function AcademicDepartmentPage() {
  return (
    <>
      <PrivateTemplate>
        <AccessTemplate accessRoles={["superAdmin"]}>
          <Head>
            <title>Instructor | Think Trail</title>
          </Head>
          <DashboardLayout>
            <AcademicDepartment />
          </DashboardLayout>
        </AccessTemplate>
      </PrivateTemplate>
    </>
  );
}
export default AcademicDepartmentPage;
