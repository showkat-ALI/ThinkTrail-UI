import React from "react";
import PrivateTemplate from "../../../../../../templates/PrivateTemplate";
import AccessTemplate from "../../../../../../templates/AccessTemplate";
import DashboardLayout from "../../../../../../components/layouts/DashboardLayout";
import Assignment from "../../../../../../components/pages/dashboard/instructor/Assignment/Assignmentmarking";


const Index = () => {
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

export default Index;
