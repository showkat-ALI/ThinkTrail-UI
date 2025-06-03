"use client"
import Head from "next/head";
import React from "react";
import DashboardLayout from "../../../../components/layouts/DashboardLayout";
import MycourseDetails from "../../../../components/pages/dashboard/stundent-self/mycoursesDetails/index";
import PrivateTemplate from "../../../../templates/PrivateTemplate";
import AccessTemplate from "../../../../templates/AccessTemplate";
import { useParams, useSearchParams } from "next/navigation";
export default function Mycourses() {
  const searchParams = useParams();
  const courseId = searchParams?.id;
  return (
    <PrivateTemplate>
      <AccessTemplate accessRoles={["student", "superAdmin"]}>
        <Head>
          <title>My Courses | Fourth IT Academy</title>
        </Head>

        <DashboardLayout>
          <MycourseDetails id={courseId} />
        </DashboardLayout>
      </AccessTemplate>
    </PrivateTemplate>
  );
}
