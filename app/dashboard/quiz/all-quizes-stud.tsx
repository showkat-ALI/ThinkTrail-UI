import type { NextPage } from "next";
import Head from "next/head";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import AccessTemplate from "../../../templates/AccessTemplate";
import PrivateTemplate from "../../../templates/PrivateTemplate";

import Allquizes from "../../../components/pages/dashboard/student-instructor-led/all-quizes/index";
const Courses: NextPage = () => {
  return (
    <>
      <PrivateTemplate>
        <AccessTemplate accessRoles={["student", "superAdmin"]}>
          <Head>
            <title>All Quiz | Think Trail</title>
          </Head>
          <DashboardLayout>
            <Allquizes />
          </DashboardLayout>
        </AccessTemplate>
      </PrivateTemplate>
    </>
  );
};

export default Courses;
