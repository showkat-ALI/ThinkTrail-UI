"use client";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux-hook/hooks";
import { refresher, signin } from "../../feature/auth/authSlice";
import BrandLoader from "../utils/loaders/BrandLoader";
import { ToastContainer } from "react-toastify";
import { useGetUserQuery } from "../../feature/api/authApi";
import "../../styles/globals.css"
type PageWrapperProps = {
  children: React.ReactNode;
};

const PageWrapper = ({ children }: PageWrapperProps) => {
  const dispatch = useAppDispatch();
  const { refresh } = useAppSelector((state) => state.auth);
  const { data, isSuccess, isError } = useGetUserQuery(undefined, {
    skip: refresh, // Don't call API if already refreshed
  });

  useEffect(() => {
    if (!refresh) {
      if (isSuccess && data?.data) {
        const { id, user, email, status, isDeleted } = data.data;
        const { needsPasswordChange, roles } = user;

        dispatch(
          signin({
            _id: id,
            id,
            email,
            needsPasswordChange,
            roles,
            isDeleted,
            status,
          })
        );
      } else if (isError) {
        dispatch(refresher());
      }
    }
  }, [refresh, isSuccess, isError, data, dispatch]);

  return (
    <div>
      <ToastContainer />
      {!refresh ? <BrandLoader /> : children}
    </div>
  );
};

export default PageWrapper;
