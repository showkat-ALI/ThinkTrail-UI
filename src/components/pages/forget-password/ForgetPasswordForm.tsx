/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Label, TextInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { InputErrorMessage } from "../../utils/error";
import { useForgetPasswordRequestMutation } from "../../../feature/api/authApi";
import ButtonLoader from "../../utils/loaders/ButtonLoader";
import { toast } from "react-toastify";
import { useEffect } from "react";
import Link from "next/link";

const signinFormSchema = z.object({
    email: z.string().email("Enter a valid email address!"),
});

type SigninFormData = z.infer<typeof signinFormSchema>;

const ForgetPasswordForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SigninFormData>({
        resolver: zodResolver(signinFormSchema),
    });
    const [forgetPasswordRequest, { error, data, isLoading, isSuccess, isError }] = useForgetPasswordRequestMutation();

    const handleRequest = (data: SigninFormData) => {
        forgetPasswordRequest(data);
    };

    // console.log("error", error);
    // console.log("data", data.user);
    // console.log("loading", isLoading, "isError", isError);
    useEffect(() => {
        if (isError) {
            toast.error((error as any).data.message);
            // toast.error(error?.data?.message);
        } else if (isSuccess) {

            console.log(data);
            toast.success("Please, check your email!");
        }
    }, [isError, isSuccess]);

    return (
        <form
            className="rounded-lg space-y-6 w-full mx-1 sm:mx-5 max-w-[23rem] bg-white p-7 font-nunito"
            onSubmit={handleSubmit(handleRequest)}
        >
            <div className="text-center text-lg font-semibold leading-3">
                <h3>Forget Password?</h3>
                <p className="text-sm mt-3">Enter your email to reset password</p>
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
            <div>
                <p>
                    Remember your password?
                    <Link href="/signin">
                        <a className="text-blue-600"> Try to signin</a>
                    </Link>
                </p>
            </div>
            <div className="mx-auto">
                <Button className="min-w-[10rem]" type="submit">
                    {isLoading ? <ButtonLoader /> : "Next"}
                </Button>
            </div>
        </form>
    );
};

export default ForgetPasswordForm;
