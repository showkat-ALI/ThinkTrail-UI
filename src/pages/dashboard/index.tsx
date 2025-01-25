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
  const { role } = useAppSelector((state) => state.auth.user);

  return (
    <PrivateTemplate>
      {/* <AccessTemplate accessRole={"admin"}> */}
      <>
        <PrivateTemplate>
          {role === "instructor" && (
            <PrivateTemplate>
              <AccessTemplate accessRole={"instructor"}>
                <Head>
                  <title> | Fourth IT Academy</title>
                </Head>

                <DashboardLayout>
                  <InstructorOverview />
                </DashboardLayout>
              </AccessTemplate>
            </PrivateTemplate>
          )}
          {role === "admin" && (
            <PrivateTemplate>
              <AccessTemplate accessRole={"admin"}>
                <Head>
                  <title>| Fourth IT Academy</title>
                </Head>

                <DashboardLayout>
                  <HomeComponent />
                </DashboardLayout>
              </AccessTemplate>
            </PrivateTemplate>
          )}
          {role === "superAdmin" && (
            <PrivateTemplate>
              <AccessTemplate accessRole={"superAdmin"}>
                <Head>
                  <title>| Fourth IT Academy</title>
                </Head>

                <DashboardLayout>
                  <HomeComponent />
                </DashboardLayout>
              </AccessTemplate>
            </PrivateTemplate>
          )}
          {role === "student" && (
            <PrivateTemplate>
              <AccessTemplate accessRole={"student"}>
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
