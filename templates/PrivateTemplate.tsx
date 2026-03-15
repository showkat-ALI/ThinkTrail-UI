"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "../redux-hook/hooks";
import { isAuthorized } from "../utils/auth";

type PrivateTemplateProps = {
  children: React.ReactNode;
};

const PrivateTemplate = ({ children }: PrivateTemplateProps) => {
  const [isReady, setIsReady] = useState(false);
  const [isValidSession, setIsValidSession] = useState(false);
  const router = useRouter();
  const { refresh, user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!isReady) return;

    const authorized = isAuthorized(user?.email, refresh);
    if (!authorized) {
      setIsValidSession(false);
      router.push("/signin");
      return;
    }

    setIsValidSession(true);
  }, [isReady, refresh, user?.email, router]);

  if (!isReady) {
    return <p>Loading ...</p>;
  }

  if (!isValidSession) {
    return null;
  }

  return <>{children}</>;
};

export default PrivateTemplate;