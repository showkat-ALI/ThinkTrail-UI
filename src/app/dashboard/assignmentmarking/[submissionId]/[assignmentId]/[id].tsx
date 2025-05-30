import React from "react";

//componentff
import Assignment from "../../../../../components/pages/dashboard/instructor/Assignment/Assignmentmarking";
import DashboardLayout from "../../../../../components/layouts/DashboardLayout";
import PrivateTemplate from "../../../../../templates/PrivateTemplate";
import AccessTemplate from "../../../../../templates/AccessTemplate";

const index = () => {
  return (
    <PrivateTemplate>
      <AccessTemplate accessRoles={["instructor", "superAdmin"]}>
        <DashboardLayout>
          <Assignment />
        </DashboardLayout>
      </AccessTemplate>
    </PrivateTemplate>
  );
};

export default index;
