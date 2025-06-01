"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "../redux-hook/hooks";
import { isAuthorized } from "../utils/auth";
// import LoadingSpinner from "./LoadingSpinner"; // Create this component

type PrivateTemplateProps = {
  children: React.ReactNode;
};

const PrivateTemplate = ({ children }: PrivateTemplateProps) => {
  const [isReady, setIsReady] = useState(false);
  const router = useRouter();
  const { refresh, user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!isReady) return;

    const checkAuth = async () => {
      if (!refresh) {
        router.push("/signin");
        return;
      }

      try {
        const authorized = await isAuthorized(user?.email, refresh);
        if (!authorized) {
          router.push("/signin");
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        router.push("/signin");
      }
    };

    checkAuth();
  }, [isReady, refresh, user?.email, router]);

  if (!isReady) {
    return <p>Loading ...</p>;
  }

  if (!refresh || !isAuthorized(user?.email, refresh)) {
    return null;
  }

  return <>{children}</>;
};

export default PrivateTemplate;