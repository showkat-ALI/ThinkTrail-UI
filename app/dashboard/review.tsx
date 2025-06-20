import type { NextPage } from "next";
import Head from "next/head";
import Review from "../../components/pages/dashboard/admin/review/review";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import PrivateTemplate from "../../templates/PrivateTemplate";
import AccessTemplate from "../../templates/AccessTemplate";

const DashboardPage: NextPage = () => {
  return (
    <PrivateTemplate>
      <AccessTemplate accessRoles={["admin"]}>
        <Head>
          <title>Home | Think Trail</title>
        </Head>

        <DashboardLayout>
          <Review />
        </DashboardLayout>
      </AccessTemplate>
    </PrivateTemplate>
  );
};

export default DashboardPage;
