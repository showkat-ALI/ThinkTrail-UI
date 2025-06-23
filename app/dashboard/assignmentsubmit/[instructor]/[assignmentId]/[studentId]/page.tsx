import Head from "next/head";
import React from "react";
import PrivateTemplate from "../../../../../../templates/PrivateTemplate";
import AccessTemplate from "../../../../../../templates/AccessTemplate";
import DashboardLayout from "../../../../../../components/layouts/DashboardLayout";
import AssignmentSubmitted from "../../../../../../components/pages/dashboard/instructor/others/student/AssignmentSubmit";

const assignmentsubmit = () => {
  return (
    <PrivateTemplate>
      <AccessTemplate accessRoles={["student","admitted"]}>
        <Head>Assignment | Think Trail</Head>
        <DashboardLayout>
          <AssignmentSubmitted />
        </DashboardLayout>
      </AccessTemplate>
    </PrivateTemplate>
  );
};

export default assignmentsubmit;
