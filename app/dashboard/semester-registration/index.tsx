import React from "react";
import PrivateTemplate from "../../../templates/PrivateTemplate";
import AccessTemplate from "../../../templates/AccessTemplate";
import Head from "next/head";
import SemesterRegistration from "../../../components/pages/dashboard/superAdmin/semester-Registration/SemesterRegistration";
import DashboardLayout from "../../../components/layouts/DashboardLayout";

const index = () => {
  return (
    <>
      <PrivateTemplate>
        <AccessTemplate accessRoles={["admin", "instructor", "superAdmin"]}>
          <Head>
            <title>Instructor File | Fourth IT Academy</title>
          </Head>
          <DashboardLayout>
            <SemesterRegistration />
          </DashboardLayout>
        </AccessTemplate>
      </PrivateTemplate>
    </>
  );
};
export default index;
