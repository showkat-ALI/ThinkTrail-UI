import Head from "next/head";
import React from "react";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import MyCourses from "../../../components/pages/dashboard/stundent-self/my-courses/Student";
import dynamic from "next/dynamic";
import PrivateTemplate from "../../../templates/PrivateTemplate";
import AccessTemplate from "../../../templates/AccessTemplate";
import { useAppSelector } from "../../../app/hooks";
import { useGetUserQuery } from "../../../feature/api/authApi";

const Student = () => {
  const { data, isSuccess, isError } = useGetUserQuery({});
  return (
    <PrivateTemplate>
      <AccessTemplate accessRoles={["student", "superAdmin"]}>
        <Head>
          <title> {data?.data?.name?.firstName}| My Courses</title>
        </Head>
        <DashboardLayout>
          <MyCourses />
        </DashboardLayout>
      </AccessTemplate>
    </PrivateTemplate>
  );
};

export default dynamic(() => Promise.resolve(Student), { ssr: false });
