"use client"
import type { NextPage } from "next";
import Head from "next/head";
import DashboardLayout from "../../../../../components/layouts/DashboardLayout";
import Quiz from "../../../../../components/pages/dashboard/student-instructor-led/quiz/index";
import dynamic from "next/dynamic";
import PrivateTemplate from "../../../../../templates/PrivateTemplate";
import AccessTemplate from "../../../../../templates/AccessTemplate";

const QuizPage: NextPage = () => {
  return (
    <PrivateTemplate>
      <AccessTemplate accessRoles={["student", "superAdmin"]}>
        <Head>
          <title>Students | Think Trail</title>
        </Head>

        <DashboardLayout>
          <Quiz />
        </DashboardLayout>
      </AccessTemplate>
    </PrivateTemplate>
  );
};

export default QuizPage;
