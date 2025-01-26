import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { refresher, signin } from "../../feature/auth/authSlice";
import BrandLoader from "../utils/loaders/BrandLoader";
import { ToastContainer } from "react-toastify";
import { useGetUserQuery } from "../../feature/api/authApi";

type PageWrapperProps = {
  children: React.ReactNode;
};

const PageWrapper = (props: PageWrapperProps) => {
  const { children } = props;
  const { refresh } = useAppSelector((state) => state.auth);
  const { data, isSuccess, isError } = useGetUserQuery({});

  console.log("me data", data);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!refresh) {
      if (isSuccess) {
        const {
          id,
          user,
          name,
          gender,
          dateOfBirth,
          email,
          contactNo,
          emergencyContactNo,
          bloogGroup,
          presentAddress,
          permanentAddress,
          guardian,
          localGuardian,
          profileImg,
          admissionSemester,
          academicDepartment,
          academicFaculty,
          isDeleted,
          status,
        } = data?.data;
        const { needsPasswordChange, roles } = user;
        setTimeout(() => {
          dispatch(
            signin({
              id,
              email,
              needsPasswordChange,
              roles,
              isDeleted,
              status,
            })
          );
        }, 2000);
      } else if (isError) {
        // SET REFRESH TRUE AFTER 2 SEC
        setTimeout(() => {
          dispatch(refresher());
        }, 2000);
      }
    }
  });
  return (
    <>
      <div>
        <ToastContainer />
      </div>
      {!refresh && <BrandLoader />}

      {children}
    </>
  );
};

export default PageWrapper;
