import Head from "next/head";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import AssignmentCreation from "../../components/pages/dashboard/instructor/assignmentcreation/AssignmentCreation";
import PrivateTemplate from "../../templates/PrivateTemplate";
import AccessTemplate from "../../templates/AccessTemplate";

const Assignmentcreation = () => {
  return (
    <PrivateTemplate>
      <AccessTemplate accessRoles={["superAdmin"]}>
        <Head>
          <title>Instructor | Think Trail</title>
        </Head>

        <DashboardLayout>
          <AssignmentCreation />
        </DashboardLayout>
      </AccessTemplate>
    </PrivateTemplate>
  );
};

export default Assignmentcreation;
