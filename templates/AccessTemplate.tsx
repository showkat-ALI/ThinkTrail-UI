"use client";
import { useAppSelector } from "../redux-hook/hooks";
import NotFound from "../components/pages/404";

type Role =
  | "superAdmin"
  | "admin"
  | "instructor"
  | "hr"
  | "faculty"
  | "student"
  | "admitted";

type PrivateTemplateProps = {
  children: React.ReactNode;
  accessRoles?: Role[];
};

const AccessTemplate = (props: PrivateTemplateProps) => {
  const roleAccessChecker = (userRoles?: Role[], accessRoles?: Role[]) => {
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
