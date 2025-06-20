import type { NextPage } from "next";
import Head from "next/head";
import PrivateTemplate from "../../../templates/PrivateTemplate";
import AccessTemplate from "../../../templates/AccessTemplate";
import TakeAdmission from "../../../components/pages/dashboard/student-instructor-led/take-admission";
import DashboardLayout from "../../../components/layouts/DashboardLayout";


const TakeAdmissionPage: NextPage = () => {
  return (
    <PrivateTemplate>
      <AccessTemplate accessRoles={["superAdmin", "student"]}>
        <Head>
          <title>Courses | Think Trail</title>
        </Head>
        <DashboardLayout>
          <TakeAdmission />
        </DashboardLayout>
      </AccessTemplate>
    </PrivateTemplate>
  );
};

export default TakeAdmissionPage;
