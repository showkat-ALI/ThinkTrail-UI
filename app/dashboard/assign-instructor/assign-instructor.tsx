import React from "react";
import PrivateTemplate from "../../../templates/PrivateTemplate";
import AccessTemplate from "../../../templates/AccessTemplate";
import Head from "next/head";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import AssignInstructors from "../../../components/pages/dashboard/superAdmin/assign-instructor/AssignInstructor";

const AssignInstructor = () => {
  return (
    <>
      <PrivateTemplate>
        <AccessTemplate accessRoles={["superAdmin"]}>
          <Head>
            <title>Instructor | Fourth IT Academy</title>
          </Head>
          <DashboardLayout>
            <AssignInstructors />
          </DashboardLayout>
        </AccessTemplate>
      </PrivateTemplate>
    </>
  );
};
export default AssignInstructor;
