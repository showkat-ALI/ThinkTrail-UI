"use client";
import Head from "next/head";
import HomeComponent from "../../components/pages/dashboard/admin/home/Home";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import PrivateTemplate from "../../templates/PrivateTemplate";
import AccessTemplate from "../../templates/AccessTemplate";
import InstructorOverview from "../../components/pages/dashboard/instructor/overview-instructor/page";
import { useAppSelector } from "../../redux-hook/hooks";
import MyCourses from "../../components/pages/dashboard/stundent-self/my-courses/Student";

const DashboardPage = () => {
  const { roles } = useAppSelector((state) => state.auth.user);
console.log(roles)
  // Only render content after PrivateTemplate verifies auth
  return (
    <PrivateTemplate>
      <Head>
        <title>Think Trail Dashboard</title>
      </Head>
      
      {roles?.includes("instructor") && (
        <AccessTemplate accessRoles={["instructor"]}>
          <DashboardLayout>
            <InstructorOverview />
          </DashboardLayout>
        </AccessTemplate>
      )}

      {(roles?.includes("admin") || roles?.includes("superAdmin")) && (
        <AccessTemplate accessRoles={["admin","superAdmin"]}>
          <DashboardLayout>
            <HomeComponent />
          </DashboardLayout>
        </AccessTemplate>
      )}

      {/* {roles?.includes("superAdmin") && (
        <AccessTemplate accessRoles={["superAdmin"]}>
          <DashboardLayout>
            <HomeComponent />
          </DashboardLayout>
        </AccessTemplate>
      )} */}

      {roles?.includes("student") && (
        <AccessTemplate accessRoles={["student"]}>
          <DashboardLayout>
            <MyCourses />
          </DashboardLayout>
        </AccessTemplate>
      )}
    </PrivateTemplate>
  );
};

export default DashboardPage;