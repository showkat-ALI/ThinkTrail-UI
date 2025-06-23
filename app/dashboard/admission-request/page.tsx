import React from "react";
import PrivateTemplate from "../../../templates/PrivateTemplate";
import AccessTemplate from "../../../templates/AccessTemplate";
import Head from "next/head";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import AdmissionTable from "../../../components/pages/dashboard/admin/students/AdmissionTable";

const AdmissionRequest = () => {
  return (
    <>
      <PrivateTemplate>
        <AccessTemplate accessRoles={["superAdmin"]}>
          <Head>
            <title>Instructor | Think Trail</title>
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
