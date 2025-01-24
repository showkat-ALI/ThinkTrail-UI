/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Label, TextInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { InputErrorMessage } from "../../utils/error";
import { useResetPasswordMutation } from "../../../feature/api/authApi";
import ButtonLoader from "../../utils/loaders/ButtonLoader";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../../app/hooks";
import { useEffect } from "react";
import Router from "next/router";
import Link from "next/link";
import { useRouter } from "next/router";

const signinFormSchema = z
  .object({
    password: z.string(),
    confirmPassword: z.string(),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password.length === 0) {
      ctx.addIssue({
        code: "custom",
        message: "Enter your password!",
        path: ["password"],
      });
    }
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "confirm password not matched!",
        path: ["confirmPassword"],
      });
    }
  });

type SigninFormData = {
  password: string;
  confirmPassword?: string;
};

const ResetPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninFormData>({
    resolver: zodResolver(signinFormSchema),
  });
  const [resetPassword, { error, data, isLoading, isSuccess, isError }] =
    useResetPasswordMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const token =
    typeof router.query.token === "string" ? router.query.token : "";

  const handleSignin = (data: SigninFormData) => {
    delete data.confirmPassword;
    resetPassword({ password: data.password, token: token });
  };

  // console.log("error", error);
  // console.log("data", data.user);
  // console.log("loading", isLoading, "isError", isError);
  useEffect(() => {
    if (isError) {
      toast.error((error as any).data.message);
      // toast.error(error?.data?.message);
    } else if (isSuccess) {
      toast.success("Your password reset Successfully!");
      setTimeout(() => {
        Router.push("/signin");
      }, 1500);
    }
  }, [isError, isSuccess]);

  return (
    <form
      className="rounded-lg space-y-6 w-full mx-1 sm:mx-5 max-w-[23rem] bg-white p-7 font-nunito"
      onSubmit={handleSubmit(handleSignin)}
    >
      <div className="text-center text-lg font-semibold leading-3">
        <h3>Reset Password</h3>
      </div>
      <div className="w-full">
        <div className="mb-2 block">
          <Label htmlFor="password" value="Password" />
        </div>
        <TextInput id="password" type="password" {...register("password")} />
        {errors.password && (
          <InputErrorMessage message={errors.password?.message || ""} />
        )}
      </div>
      <div className="w-full">
        <div className="mb-2 block">
          <Label htmlFor="confirmPassword" value="Confirm Password" />
        </div>
        <TextInput
          id="confirmPassword"
          type="password"
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <InputErrorMessage message={errors.confirmPassword?.message || ""} />
        )}
      </div>
      <div>
        <p>
          Have another account?
          <Link href="/signin">
            <a className="text-blue-600"> signin</a>
          </Link>
        </p>
      </div>
      <div className="mx-auto">
        <Button className="min-w-[10rem]" type="submit">
          {isLoading ? <ButtonLoader /> : "Reset"}
        </Button>
      </div>
    </form>
  );
};

export default ResetPasswordForm;
