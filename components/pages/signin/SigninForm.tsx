/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { InputErrorMessage } from "../../utils/error";
import { useLoginMutation } from "../../../feature/api/authApi";
import ButtonLoader from "../../utils/loaders/ButtonLoader";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../../redux-hook/hooks";
import { signin } from "../../../feature/auth/authSlice";
import { useEffect } from "react";
import { useRouter } from "next/navigation"; // Updated import
import Link from "next/link";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  userId: string;
  roles: string[];
  email: string;
  status: string;
  isDeleted: boolean;
  _id: string;
}

const signinFormSchema = z
  .object({
    id: z.string(),
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
  const router = useRouter(); // Proper hook usage
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninFormData>({
    resolver: zodResolver(signinFormSchema),
  });
  
  const [login, { error, data, isLoading, isSuccess, isError }] = useLoginMutation();
  const dispatch = useAppDispatch();

  const handleSignin = (data: SigninFormData) => {
    login(data);
  };

  useEffect(() => {
    if (isError) {
      toast.error((error as any)?.data?.message || "Login failed");
    } else if (isSuccess && data?.data) {
      const { accessToken, needsPasswordChange } = data.data;

      try {
        const decodedToken = jwtDecode<DecodedToken>(accessToken);
        const { userId, roles, email, status, isDeleted, _id } = decodedToken;
console.log(email,"after login")
        dispatch(
          signin({
            _id,
            id: userId,
            email,
            needsPasswordChange,
            status: ["in-progress", "blocked"].includes(status) ? (status as "in-progress" | "blocked" | undefined) : undefined,
            isDeleted,
            roles: roles.filter((role) =>
              ["admin", "student", "hr", "instructor", "superAdmin"].includes(role)
            ) as ("admin" | "student" | "hr" | "instructor" | "superAdmin"|"admitted")[],
          })
        );

        toast.success("Sign in Successfully!");
        setTimeout(() => {
          router.push("/dashboard"); // Using router.push properly
        }, 1500);
      } catch (decodeError) {
        toast.error("Failed to process your login");
        console.error("Token decode error:", decodeError);
      }
    }
  }, [isError, isSuccess, data, error, dispatch, router]);

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
          <Label htmlFor="id" value="id" />
        </div>
        <TextInput
          id="email"
          type="text"
          placeholder="250000001"
          {...register("id")}
        />
        {errors.id && <InputErrorMessage message={errors.id?.message || ""} />}
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
            <span className="text-blue-600">Forgot password</span>
          </Link>
        </div>
      </div>
      <div>
        <p>
          Don&apos;t have an account?
          <Link href="/registration">
            <span className="text-blue-600"> Register Here</span>
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
