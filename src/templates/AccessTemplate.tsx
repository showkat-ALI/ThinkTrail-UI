import { useAppSelector } from "../app/hooks";
import NotFound from "../components/pages/404";

type Roles =
  | ("admin" | "student" | "instructor" | "hr" | "superAdmin")[]
  | undefined;
type PrivateTemplateProps = {
  children: React.ReactNode;
  accessRoles: Roles;
};

const AccessTemplate = (props: PrivateTemplateProps) => {
  const roleAccessChecker = (userRoles: Roles, accessRoles: Roles) => {
    if (!userRoles || !accessRoles) {
      return false;
    }

    return accessRoles.some((role) => userRoles.includes(role));
  };

  const { children, accessRoles } = props;
  const {
    user: { roles },
  } = useAppSelector((state) => state.auth);

  return roleAccessChecker(roles, accessRoles) ? <>{children}</> : <NotFound />;
};

export default AccessTemplate;
