import React from "react";
import { AcademicFaculty } from "../../../components/pages/dashboard/superAdmin/academic-faculty/AcademicFaculty";
import PrivateTemplate from "../../../templates/PrivateTemplate";
import AccessTemplate from "../../../templates/AccessTemplate";
import Head from "next/head";
import DashboardLayout from "../../../components/layouts/DashboardLayout";

const index = () => {
  return (
    <>
      <PrivateTemplate>
        <AccessTemplate accessRoles={["superAdmin"]}>
          <Head>
            <title>Instructor | Fourth IT Academy</title>
          </Head>
          <DashboardLayout>
            kjkdjlkfj
            {/* <AcademicFaculty /> */}
          </DashboardLayout>
        </AccessTemplate>
      </PrivateTemplate>
    </>
  );
};
export default index;
