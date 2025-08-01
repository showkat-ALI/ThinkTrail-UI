import React from "react";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import CreateAnnouncement from "../../../components/pages/dashboard/admin/announcement/create-announcement/index";
import PrivateTemplate from "../../../templates/PrivateTemplate";
import AccessTemplate from "../../../templates/AccessTemplate";
import Head from "next/head";
export default function index() {
  return (
    <PrivateTemplate>
      <AccessTemplate accessRoles={["admin", "instructor", "superAdmin"]}>
        <Head>
          <title>Create Announcement | Think Trail</title>
        </Head>
        <DashboardLayout>
          <CreateAnnouncement />
        </DashboardLayout>
      </AccessTemplate>
    </PrivateTemplate>
  );
}
