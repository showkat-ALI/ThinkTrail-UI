import React from "react";
import PrivateTemplate from "../../../templates/PrivateTemplate";
import AccessTemplate from "../../../templates/AccessTemplate";
import Head from "next/head";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import AssignAdmin from "../../../components/pages/dashboard/superAdmin/assign-admin/AssignAdmin";
import AdmissionTable from "../../../components/pages/dashboard/admin/students/AdmissionTable";

const AdmissionRequest = () => {
  return (
    <>
      <PrivateTemplate>
        <AccessTemplate accessRoles={["superAdmin"]}>
          <Head>
            <title>Instructor | Fourth IT Academy</title>
          </Head>
          <DashboardLayout>
            <AdmissionTable/>
          </DashboardLayout>
        </AccessTemplate>
      </PrivateTemplate>
    </>
  );
};
export default AdmissionRequest;
