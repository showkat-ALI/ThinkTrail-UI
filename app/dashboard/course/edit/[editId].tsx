import React from "react";
import Head from "next/head";

//component
import CourseCreationMain from "../../../../components/pages/dashboard/instructor/course edit/CourseEditMain";
import DashboardLayout from "../../../../components/layouts/DashboardLayout";
import PrivateTemplate from "../../../../templates/PrivateTemplate";
import AccessTemplate from "../../../../templates/AccessTemplate";

const Edit = () => {
  return (
    <PrivateTemplate>
      <AccessTemplate accessRoles={["admin", "instructor", "superAdmin"]}>
        <Head>
          <title>Instructor File | Think Trail</title>
        </Head>
        <DashboardLayout>
          <CourseCreationMain />
        </DashboardLayout>
      </AccessTemplate>
    </PrivateTemplate>
  );
};

export default Edit;
