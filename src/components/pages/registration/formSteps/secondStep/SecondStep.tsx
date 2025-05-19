import { useForm } from "react-hook-form";
// import Textfield from "../../../../common/forms/Textfield";
// import { SelectOptions } from "../../BottomRegisForm";
// import { useFormContext } from "react-hook-form";
import { BsFillEnvelopeFill } from "react-icons/bs";
import { InputErrorMessage } from "../../../../utils/error";
import { StepProps } from "../firstStep/FirstStep";
// import { useGetStatesQuery } from "../../../../../feature/api/dashboardApi";
// import { useGetAccessUniversalQuery } from "../../../../../feature/api/dashboardApi";
// import { useGetAccessTokenQuery } from "../../../../../feature/api/statesApi";

type RegistrationSecondStepFromData = {
  email: string;
  dateOfBirth:string;
  gender:string;
};

const SecondStep = (props: StepProps) => {
  const { setStep, setFormData, formData } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationSecondStepFromData>({
    // resolver: zodResolver(registrationFirstStepFromSchema)
    defaultValues: {
      email: formData.email,
      gender:formData.gender,
      dateOfBirth:formData.dateOfBirth
      
    },
  });

  const submitSecondStep = (data: RegistrationSecondStepFromData) => {
    console.log("second form data", data);
    setStep(2);
    setFormData((prev) => ({ ...prev, ...data }));
  };
  // const { data, isSuccess, isError, isLoading } = useGetStatesQuery([]);
  // const { data, isSuccess, isError, isLoading } = useGetAccessTokenQuery({});
  // console.log(data, "states");
  // console.log("geeing states");
  return (
    <form onSubmit={handleSubmit(submitSecondStep)}>
      <div className="flex flex-col w-full  gap-7 mt-3 font-nunito xl:items-baseline lg:items-baseline md:items-baseline sm:items-baseline xsm:items-center">
        <div
          className={`lg:w-full xl:w-full md:w-full sm:w-full xsm:w-60 ${
            errors.email && "border-t-2 border-red-500"
          }`}
        >
          <div className="lg:w-full xl:w-full md:w-full sm:w-full xsm:w-auto flex items-end  bg-slate-100  xsm:px-2 xsm:py-1 lg:px-3 xl:px-3 md:px-3 sm:px-3 lg:py-2 xl:py-2 md:py-2 sm:py-2 ">
            <BsFillEnvelopeFill className="w-6 h-6 my-auto" />
            <input
              className="w-full outline-none bg-slate-100 ml-2"
              type={"email"}
              placeholder="Email"
              {...register("email", {
                required: true,
                pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
              })}
            />
          </div>
          {errors.email && (
            <InputErrorMessage message={"Enter a valid email address"} />
          )}
        </div>
        <select
          {...register("gender", { required: true })}
          id="media"
          className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 lg:w-full xl:w-full md:w-full sm:w-full xsm:w-3/4 xl:p-2.5 lg:p-2.5 md:p-2.5 sm:p-2.5 xsm:p-2"
        >
          <option value={""}>{"Select Your Gender"}</option>
          {[
           "female",
           "male",
           "other"
          ].map((item, id) => (
            <option value={item} key={id}>
              {item}
            </option>
          ))}
        </select>
        {errors.gender && <InputErrorMessage message={"select your gender"} />}

        <input
          {...register("dateOfBirth", { required: true })}
          type="date"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 lg:w-full xl:w-full md:w-full sm:w-full xsm:w-3/4 xl:p-2.5 lg:p-2.5 md:p-2.5 sm:p-2.5 xsm:p-2"
        />
        {errors.dateOfBirth && (
          <InputErrorMessage message={"Enter your date of birth"} />
        )}
      </div>
      <div className={`flex  justify-center gap-7 items-center mt-3`}>
        <button
          className={`xl:w-36 lg:w-36 sm:w-36 md:w-36 xsm:w-24   h-10 rounded-lg text-white text-center  px-2 py-1 bg-blue-700 font-bold text-lg`}
          type="button"
          onClick={() => setStep(0)}
        >
          Back
        </button>

        <button
          type="submit"
          className={`font-bold text-lg xl:w-36 lg:w-36 sm:w-36 md:w-36 xsm:w-24 h-10 rounded-lg text-white text-center  px-2 py-1 bg-blue-700`}
        >
          Next
        </button>
      </div>
    </form>
  );
};

export default SecondStep;
