import type { NextPage } from "next";
import Head from "next/head";
import HomeComponent from "../../components/pages/dashboard/admin/home/Home";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import PrivateTemplate from "../../templates/PrivateTemplate";
import AccessTemplate from "../../templates/AccessTemplate";
import InstructorOverview from "../../components/pages/dashboard/instructor/overview-instructor";
import { useAppSelector } from "../../app/hooks";
import MyCourses from "../../components/pages/dashboard/stundent-self/my-courses/Student";

const DashboardPage: NextPage = () => {
  const { roles } = useAppSelector((state) => state.auth.user);

  return (
    <PrivateTemplate>
      {/* <AccessTemplate accessRole={"admin"}> */}
      <>
        <PrivateTemplate>
          {roles?.includes("instructor") && (
            <PrivateTemplate>
              <AccessTemplate accessRoles={["instructor"]}>
                <Head>
                  <title> | Fourth IT Academy</title>
                </Head>

                <DashboardLayout>
                  <InstructorOverview />
                </DashboardLayout>
              </AccessTemplate>
            </PrivateTemplate>
          )}
          {roles?.includes("admin") && (
            <PrivateTemplate>
              <AccessTemplate accessRoles={["admin"]}>
                <Head>
                  <title>| Fourth IT Academy</title>
                </Head>

                <DashboardLayout>
                  <HomeComponent />
                </DashboardLayout>
              </AccessTemplate>
            </PrivateTemplate>
          )}
          {roles?.includes("superAdmin") && (
            <PrivateTemplate>
              <AccessTemplate accessRoles={["superAdmin"]}>
                <Head>
                  <title>| Fourth IT Academy</title>
                </Head>

                <DashboardLayout>
                  <HomeComponent />
                </DashboardLayout>
              </AccessTemplate>
            </PrivateTemplate>
          )}
          {roles?.includes("student") && (
            <PrivateTemplate>
              <AccessTemplate accessRoles={["student"]}>
                <Head>
                  <title> | Fourth IT Academy</title>
                </Head>

                <DashboardLayout>
                  <MyCourses />
                </DashboardLayout>
              </AccessTemplate>
            </PrivateTemplate>
          )}
        </PrivateTemplate>
      </>
      {/* </AccessTemplate> */}
    </PrivateTemplate>
  );
};

export default DashboardPage;
