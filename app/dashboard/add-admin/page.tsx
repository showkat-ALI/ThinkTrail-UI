import Head from "next/head";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import PrivateTemplate from "../../../templates/PrivateTemplate";
import AccessTemplate from "../../../templates/AccessTemplate";
import { AddingAdmin } from "../../../components/pages/dashboard/superAdmin/add-admin/AddingAdmin";

const Assignmentcreation = () => {
  return (
    <PrivateTemplate>
      <AccessTemplate accessRoles={["superAdmin"]}>
        <Head>
          <title>Instructor | Think Trail</title>
        </Head>

        <DashboardLayout>
          <AddingAdmin />
        </DashboardLayout>
      </AccessTemplate>
    </PrivateTemplate>
  );
};

export default Assignmentcreation;
