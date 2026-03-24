import React from "react";

//component
import CourseCreationMain from "../../../../components/pages/dashboard/instructor/course edit/CourseEditMain";
import DashboardLayout from "../../../../components/layouts/DashboardLayout";
import PrivateTemplate from "../../../../templates/PrivateTemplate";
import AccessTemplate from "../../../../templates/AccessTemplate";

const EditPage = () => {
  return (
    <PrivateTemplate>
      <AccessTemplate accessRoles={["admin", "instructor", "superAdmin"]}>
        <DashboardLayout>
          <CourseCreationMain />
        </DashboardLayout>
      </AccessTemplate>
    </PrivateTemplate>
  );
};

export default EditPage;
