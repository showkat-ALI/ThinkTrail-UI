import type { NextPage } from "next";
import Head from "next/head";
import PrivateTemplate from "../../templates/PrivateTemplate";
import AccessTemplate from "../../templates/AccessTemplate";
import DashboardLayout from "../../components/layouts/DashboardLayout";
// import DashboardLayout from "../../components/layouts/DashboardLayout";
// import CourseComponent from "../../components/pages/dashboard/admin/courses";
// import AccessTemplate from "../../templates/AccessTemplate";
// import PrivateTemplate from "../../templates/PrivateTemplate";

const TakeAdmission: NextPage = () => {
  return (
    <PrivateTemplate>
      <AccessTemplate accessRoles={["superAdmin"]}>
        <Head>
          <title>Courses | Fourth IT Academy</title>
        </Head>
        <DashboardLayout>
          <h1>Take admisssoin</h1>
        </DashboardLayout>
      </AccessTemplate>
    </PrivateTemplate>
  );
};

export default TakeAdmission;
