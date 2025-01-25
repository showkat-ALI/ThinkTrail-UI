import { useAppSelector } from "../app/hooks";
import NotFound from "../components/pages/404";

type Roles =
  | ("admin" | "student" | "instructor" | "hr" | "superAdmin")
  | undefined;
type PrivateTemplateProps = {
  children: React.ReactNode;
  accessRole: Roles;
};

const AccessTemplate = (props: PrivateTemplateProps) => {
  const roleAccessChecker = (userRole: Roles, accessRole: Roles) => {
    if (userRole !== undefined) {
      return true;
    }

    return false;
  };

  const { children, accessRole } = props;
  const {
    user: { role },
  } = useAppSelector((state) => state.auth);

  return roleAccessChecker(role, accessRole) ? <>{children}</> : <NotFound />;
};

export default AccessTemplate;
