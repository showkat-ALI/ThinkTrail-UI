import type { NextPage } from "next";
import Head from "next/head";
import PrivateTemplate from "../../templates/PrivateTemplate";
import AccessTemplate from "../../templates/AccessTemplate";
import TakeAdmission from "../../components/pages/dashboard/student-instructor-led/take-admission";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import dynamic from "next/dynamic";

const takeAdmission: NextPage = () => {
  return (
    <PrivateTemplate>
      <AccessTemplate accessRoles={["superAdmin"]}>
        <Head>
          <title>Courses | Fourth IT Academy</title>
        </Head>
        <DashboardLayout>
          <TakeAdmission />
        </DashboardLayout>
      </AccessTemplate>
    </PrivateTemplate>
  );
};
export default dynamic(() => Promise.resolve(takeAdmission), { ssr: false });
