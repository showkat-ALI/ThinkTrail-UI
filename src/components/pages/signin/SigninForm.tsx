/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { InputErrorMessage } from "../../utils/error";
import { useLoginMutation } from "../../../feature/api/authApi";
import ButtonLoader from "../../utils/loaders/ButtonLoader";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../../app/hooks";
import { signin } from "../../../feature/auth/authSlice";
import { useEffect } from "react";
import Router from "next/router";
import Link from "next/link";

const signinFormSchema = z
  .object({
    email: z.string().email("Enter a Valid Email Address!"),
    password: z.string(),
  })
  .superRefine(({ password }, ctx) => {
    if (password.length === 0) {
      ctx.addIssue({
        code: "custom",
        message: "Enter your password!",
        path: ["password"],
      });
    }
  });

type SigninFormData = z.infer<typeof signinFormSchema>;

const SigninForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninFormData>({
    resolver: zodResolver(signinFormSchema),
  });
  const [login, { error, data, isLoading, isSuccess, isError }] =
    useLoginMutation();
  const dispatch = useAppDispatch();
  // console.log("user data", data);

  const handleSignin = (data: SigninFormData) => {
    login(data);
  };

  // console.log("error", error);
  // console.log("data", data.user);
  // console.log("loading", isLoading, "isError", isError);
  useEffect(() => {
    if (isError) {
      toast.error((error as any).data.message);
      // toast.error(error?.data?.message);
    } else if (isSuccess) {
      const {
        id,
        title,
        firstName,
        lastName,
        gender,
        email,
        phone,
        state,
        country,
        currentJob,
        studentType,
        status,
        highestStudy,
        avatar,
        roles = [],
        expertise = "",
        houseOrFlat = "",
        landMark = "",
        streetAddress = "",
        townOrCity = "",
        stateOrCountry = "",
        postalOrZip = "",
        userName = "",
      } = data.data.user;

      dispatch(
        signin({
          id,
          title,
          firstName,
          lastName,
          gender,
          email,
          phone,
          state,
          country,
          currentJob,
          studentType,
          status,
          highestStudy,
          avatar,
          roles,
          expertise,
          houseOrFlat,
          landMark,
          streetAddress,
          townOrCity,
          stateOrCountry,
          postalOrZip,
          userName,
        })
      );

      toast.success("Sign in Successfully!");
      setTimeout(() => {
        Router.push("/dashboard");
      }, 1500);
    }
  }, [isError, isSuccess]);

  return (
    <form
      className="rounded-lg space-y-6 w-full mx-1 sm:mx-5 max-w-[23rem] bg-white p-7 font-nunito"
      onSubmit={handleSubmit(handleSignin)}
    >
      <div className="text-center text-lg font-semibold leading-3">
        <h3>Sign In</h3>
        <p className="text-sm mt-3">Sign in to stay connected.</p>
      </div>
      <div className="w-full">
        <div className="mb-2 block">
          <Label htmlFor="email" value="Email" />
        </div>
        <TextInput
          id="email"
          type="email"
          placeholder="name@flowbite.com"
          {...register("email")}
        />
        {errors.email && (
          <InputErrorMessage message={errors.email?.message || ""} />
        )}
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
      <div className="flex items-center w-full justify-between">
        <div className="gap-2">
          <Checkbox id="remember" />
          <Label htmlFor="remember" className="ml-2">
            Remember me?
          </Label>
        </div>
        <div>
          <Link href="/forget-password">
            <a className="text-blue-600">Forgot password</a>
          </Link>
        </div>
      </div>
      <div>
        <p>
          Don&apos;t have an account?
          <Link href="/registration">
            <a className="text-blue-600"> Register Here</a>
          </Link>
        </p>
      </div>
      <div className="mx-auto">
        <Button className="min-w-[10rem]" type="submit">
          {isLoading ? <ButtonLoader /> : "Sign in"}
        </Button>
      </div>
    </form>
  );
};

export default SigninForm;
