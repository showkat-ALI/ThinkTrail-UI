import type { NextPage } from "next";
import Head from "next/head";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import StudentsComponent from "../../components/pages/dashboard/admin/students/Students";
import AccessTemplate from "../../templates/AccessTemplate";
import PrivateTemplate from "../../templates/PrivateTemplate";
import dynamic from "next/dynamic";

const Students: NextPage = () => {
  return (
    <PrivateTemplate>
      <AccessTemplate accessRole={["admin", "instructor"]}>
        <Head>
          <title>Students | Fourth IT Academy</title>
        </Head>

        <DashboardLayout>
          <div className="px-6 lg:px-8 min-h-[100vh]">
            <StudentsComponent />
          </div>
        </DashboardLayout>
      </AccessTemplate>
    </PrivateTemplate>
  );
};

export default dynamic(() => Promise.resolve(Students), { ssr: false });
