/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "flowbite-react";
import Router from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { BsFillTelephoneFill } from "react-icons/bs";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../../../../app/hooks";
import { useRegisterMutation } from "../../../../../feature/api/authApi";
import { InputErrorMessage } from "../../../../utils/error";
import ButtonLoader from "../../../../utils/loaders/ButtonLoader";
import { StepProps } from "../firstStep/FirstStep";
import Link from "next/link";
type RegistrationFirstStepFromData = {
  phone: string;
  agree?: boolean;
};

const FourthStep = (props: StepProps) => {
  const { setStep, setFormData, formData } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationFirstStepFromData>({
    defaultValues: {
      phone: formData.phone,
      agree: formData.agree,
    },
  });
  const dispatch = useAppDispatch();

  const [registration, { error, data, isLoading, isSuccess, isError }] =
    useRegisterMutation();

  const HandleRegistration = (data: RegistrationFirstStepFromData) => {
    const userData = { ...formData, ...data };
    delete userData.agree;
    setFormData((prev) => ({ ...prev, ...data }));
    console.log("userData", userData);
    registration(userData);
  };

  useEffect(() => {
    if (isError) {
      // toast.error((error as any).data.message);
      // toast.error((error as any).data.error[Object.keys((error as any).data.error)[0]]);

      console.log("error", error);
    } else if (isSuccess) {
      toast.success(
        "Registration successful. You will get next instructions via a email soon."
      );
      setTimeout(() => {
        Router.push("/");
      }, 1500);
    }
  }, [isError, isSuccess]);

  return (
    <form onSubmit={handleSubmit(HandleRegistration)} className="font-nunito">
      <div
        className={`lg:w-full xl:w-full md:w-full sm:w-full xsm:w-64 mt-3 xl:mx-0 lg:mx-0 md:mx-0 sm:mx-0 xsm:mx-auto ${
          errors.phone && "border-t-2 border-red-500"
        }`}
      >
        <div className=" lg:w-full xl:w-full md:w-full sm:w-full xsm:w-auto flex items-end  bg-slate-100  xsm:px-1 xsm:py-1 lg:px-3 xl:px-3 md:px-3 sm:px-3 lg:py-2 xl:py-2 md:py-2 sm:py-2">
          <BsFillTelephoneFill className="w-6 h-6 my-auto" />
          {}
          <input
            className={` lg:w-full xl:w-full md:w-full sm:w-full  xsm:w-auto outline-none bg-slate-100 lg:ml-2 md:ml-2 sm:ml-2 xl:ml-2 xsm:ml-1  `}
            type={"tel"}
            placeholder="Phone"
            {...register("phone", { required: true })}
          />
        </div>
        {errors.phone && (
          <InputErrorMessage message={"Enter your phone number"} />
        )}
      </div>

      <div className="mt-2 xsm:p-8 lg:p-0 xl:p-0 md:p-0 sm:p-0">
        <input
          type="checkbox"
          id="consent"
          value="true"
          className=" mr-3  "
          {...register("agree", { required: true })}
        />
        <label htmlFor="consent">
          By checking this box, I consent to be contacted by or on behalf of
          Fourth IT Academy, including by email, phone or text, about my
          interest in furthering my career with the bootcamp. I also agree to
          the
          <span className="underline mx-[3px]">
            <Link href="/terms-of-use" className="underline ">
              Terms of Use
            </Link>
          </span>
          <span className="mx-1">and</span>
          <span className="underline mx-[3px]">
            <Link href="/privacy-policy" className="underline mx-[1px]">
              Privacy Policy
            </Link>
          </span>
          .
        </label>
      </div>
      {errors.agree && <InputErrorMessage message={"You have to agree"} />}

      <div className={`flex  justify-center gap-7 items-center mt-3`}>
        <button
          className={`xl:w-36 lg:w-36 sm:w-36 md:w-36 xsm:w-24 h-10 rounded-lg text-white text-center  px-2 py-1 bg-blue-700 font-bold text-lg`}
          type="button"
          onClick={() => setStep(2)}
        >
          Back
        </button>
        <Button
          className="xl:w-36 lg:w-36 sm:w-36 md:w-36 xsm:w-24 font-bold text-lg text-white"
          type="submit"
        >
          {isLoading ? <ButtonLoader /> : "Submit"}
        </Button>
      </div>
    </form>
  );
};

export default FourthStep;
