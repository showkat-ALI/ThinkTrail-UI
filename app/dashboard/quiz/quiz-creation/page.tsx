import type { NextPage } from "next";
import Head from "next/head";
import DashboardLayout from "../../../../components/layouts/DashboardLayout";
import QuizCreation from "../../../../components/pages/dashboard/instructor/quiz-creation/index";
import dynamic from "next/dynamic";
import PrivateTemplate from "../../../../templates/PrivateTemplate";
import AccessTemplate from "../../../../templates/AccessTemplate";

const students: NextPage = () => {
  return (
    <PrivateTemplate>
      <AccessTemplate accessRoles={["admin", "instructor", "superAdmin"]}>
        <Head>
          <title>Quiz Creation | Think Trail</title>
        </Head>

        <DashboardLayout>
          <div>
            <QuizCreation />
          </div>
        </DashboardLayout>
      </AccessTemplate>
    </PrivateTemplate>
  );
};

export default students
