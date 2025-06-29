import type { NextPage } from "next";
import Head from "next/head";
import DashboardLayout from "../../../../../../components/layouts/DashboardLayout";
import AssignmentSubmission from "../../../../../../components/pages/dashboard/student-instructor-led/assignment-submission/index";
import dynamic from "next/dynamic";
import PrivateTemplate from "../../../../../../templates/PrivateTemplate";
import AccessTemplate from "../../../../../../templates/AccessTemplate";

const Index: NextPage = () => {
  return (
    <PrivateTemplate>
      <AccessTemplate accessRoles={["student", "superAdmin"]}>
        <Head>
          <title>Students | Think Trail</title>
        </Head>

        <DashboardLayout>
          <div>
            <AssignmentSubmission />
          </div>
        </DashboardLayout>
      </AccessTemplate>
    </PrivateTemplate>
  );
};

export default Index;
