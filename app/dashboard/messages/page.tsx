import Head from "next/head";
import React from "react";
import PrivateTemplate from "../../../templates/PrivateTemplate";
import AccessTemplate from "../../../templates/AccessTemplate";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import MessagesGrid from "../../../components/pages/dashboard/admin/messages/MessagesGrid";

const assignmentsubmit = () => {
  return (
    <PrivateTemplate>
      <AccessTemplate accessRoles={["student","admitted"]}>
        <Head>Assignment | Think Trail</Head>
        <DashboardLayout>
          <MessagesGrid />
        </DashboardLayout>
      </AccessTemplate>
    </PrivateTemplate>
  );
};

export default assignmentsubmit;
