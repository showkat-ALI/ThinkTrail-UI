import type { NextPage } from "next";
import Head from "next/head";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import Users from "../../components/pages/dashboard/admin/users/Users";
import AccessTemplate from "../../templates/AccessTemplate";
import PrivateTemplate from "../../templates/PrivateTemplate";

const UsersPage: NextPage = () => {
  return (
    <PrivateTemplate>
      <AccessTemplate accessRoles={["admin", "superAdmin"]}>
        <Head>
          <title>Instructor | Think Trail</title>
        </Head>
        <DashboardLayout>
          <Users />
        </DashboardLayout>
      </AccessTemplate>
    </PrivateTemplate>
  );
};

export default UsersPage;
