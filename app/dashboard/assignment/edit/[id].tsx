import Head from "next/head";
import DashboardLayout from "../../../../components/layouts/DashboardLayout";
import AssignmentEditComponent from "../../../../components/pages/dashboard/instructor/Assignment/edit/index";
import PrivateTemplate from "../../../../templates/PrivateTemplate";
import AccessTemplate from "../../../../templates/AccessTemplate";

const AssignmentEdit = () => {
  return (
    <PrivateTemplate>
      <AccessTemplate accessRoles={["admin", "instructor", "superAdmin"]}>
        <Head>
          <title>Edit Assignments | Think Trail</title>
        </Head>

        <DashboardLayout>
          <AssignmentEditComponent />
        </DashboardLayout>
      </AccessTemplate>
    </PrivateTemplate>
  );
};

export default AssignmentEdit;
