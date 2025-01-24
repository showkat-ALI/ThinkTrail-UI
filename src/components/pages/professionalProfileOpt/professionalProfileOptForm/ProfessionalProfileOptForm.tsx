import React, { useEffect, useState } from "react";
import { Spinner } from "flowbite-react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { InputErrorMessage } from "../../../../components/utils/error/index";
import { useCreateOptimizationMutation } from "../../../../feature/api/dashboardApi";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useSingleFileUploadMutation } from "../../../../feature/api/mediaUploadApi";

interface ProfessionalProfileOptFormProps {
  url: any;
  key: any;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  education: string;
  linkedin: string;
  city: string;
  country: string;
  message: string;
}
const allCountry = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cabo Verde",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Central African Republic (CAR)",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Democratic Republic of the Congo",
  "Republic of the Congo",
  "Costa Rica",
  "Cote d'Ivoire",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Kosovo",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Macedonia (FYROM)",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar (Burma)",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Korea",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestine",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Korea",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Swaziland",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor-Leste",
  "Togo",
  "Tonga",
];

const ProfessionalProfileOptForm = () => {
  const [Filename, setFilename] = useState();
  const [filePreview, setFilePreview] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfessionalProfileOptFormProps>();
  const [mentoringCreate, { error, data, isLoading, isSuccess, isError }] =
    useCreateOptimizationMutation();
  const [
    singleFileupload,
    {
      isLoading: uploadLoading,
      error: uploadError,
      data: uploadData,
      isSuccess: isUploadSuccess,
      isError: isUploadError,
    },
  ] = useSingleFileUploadMutation();

  const FileGet = (e: any) => {
    const file = e.target.files;
    if (file && file.length > 0 && file["0"]) {
      const formData = new FormData();
      formData.append("file", file["0"]);
      setFilename(e.target.files[0].name);
      singleFileupload(formData);
    } else if (
      file &&
      file.length > 0 &&
      file["0"].type.substr(0, 5) !== "file"
    ) {
      toast.error("Select a valid file.");
    }
  };

  useEffect(() => {
    if (isUploadError) {
      console.log("upload error", uploadError);
      toast.error("file upload failed");
    } else if (isUploadSuccess) {
      console.log("upload success", uploadData);
      setFilePreview(uploadData.data.fileUrl);
      // setValue("fileUrl",uploadData.data.fileUrl)
      // setValue("key",uploadData.data.key)
      toast.success("upload file success");
    }
  }, [isUploadError, isUploadSuccess]);

  const submitMentoringCoachingForm = (
    data: ProfessionalProfileOptFormProps
  ) => {
    if (
      uploadData?.data.fileUrl !== undefined &&
      uploadData?.data.key !== undefined
    ) {
      const Userdata = {
        ...data,
        url: uploadData?.data.fileUrl,
        key: uploadData?.data.key,
      };
      mentoringCreate(Userdata);
    } else if (
      uploadData?.data.fileUrl === undefined &&
      uploadData?.data.key === undefined
    ) {
      toast.error("Upload a file first");
    }
  };
  useEffect(() => {
    if (isError) {
      toast.error(
        "Profile optimization could'nt created, Upload a file first then try again"
      );
    }
    if (isSuccess) {
      toast.success("Profile optimization Created Successfully");
      reset();
    }
  }, [isError, isSuccess]);

  return (
    <div className="container font-nunito">
      <div className="p-[2rem] mt-[-260px]  lg:mt-[-465px] bg-white container md:max-w-[1080px]  pt-16 mb-20 shadow-slate-300 shadow-xl rounded-xl">
        <div className="">
          <div className="flex justify-center items-center">
            <h1 className="text-4xl font-semibold ">
              Professional Profile Optimization
            </h1>
          </div>
          <div>
            <div className=" flex font-bold lg:items-center md:items-center lg:justify-center md:justify-center flex-col my-5 ">
              <p className="max-w-[500px] text-center text-small-text-color">
                What is stopping you from landing that interview? Learn how to
                tailor your resume to match your dream job.
              </p>
            </div>
          </div>
        </div>
        <div className=" my-3">
          <form onSubmit={handleSubmit(submitMentoringCoachingForm)}>
            <div className="flex justify-center items-center flex-wrap gap-3">
              <div className="basis-full sm:basis-[49%] flex flex-col font-nunito">
                <label className="mb-1 font-nunito text-small-text-color">
                  First Name
                </label>

                <input
                  className=" border-[0.5px] border-gray-200  rounded-r-[0.25rem] rounded-l-[0.25rem] px-[0.45rem] py-[0.45rem] bg-"
                  type={"text"}
                  // placeholder={placeholder}
                  // name={name}
                  {...register("firstName", { required: true })}
                />
                {errors.firstName && (
                  <InputErrorMessage message={"Name can't be empty"} />
                )}
              </div>
              <div className="basis-full sm:basis-[49%] flex flex-col font-nunito">
                <label className="mb-1 font-nunito text-small-text-color">
                  Last Name
                </label>

                <input
                  className=" border-[0.5px] border-gray-200  rounded-r-[0.25rem] rounded-l-[0.25rem] px-[0.45rem] py-[0.45rem] bg-"
                  type={"text"}
                  // placeholder={placeholder}
                  // name={name}
                  {...register("lastName", { required: true })}
                />
                {errors.lastName && (
                  <InputErrorMessage message={"Name can't be empty"} />
                )}
              </div>
              <div className="basis-full sm:basis-[49%] flex flex-col font-nunito">
                <label className="mb-1 font-nunito text-small-text-color">
                  Email
                </label>

                <input
                  className=" border-[0.5px] border-gray-200  rounded-r-[0.25rem] rounded-l-[0.25rem] px-[0.45rem] py-[0.45rem] bg-"
                  type={"email"}
                  // placeholder={placeholder}
                  // name={name}
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <InputErrorMessage message={"Email can't be empty"} />
                )}
              </div>
              <div className="basis-full sm:basis-[49%] flex flex-col font-nunito">
                <label className="mb-1 font-nunito text-small-text-color">
                  Phone
                </label>

                <input
                  className=" border-[0.5px] border-gray-200  rounded-r-[0.25rem] rounded-l-[0.25rem] px-[0.45rem] py-[0.45rem] bg-"
                  type={"tel"}
                  // placeholder={placeholder}
                  // name={name}
                  {...register("phone", { required: true })}
                />
                {errors.phone && (
                  <InputErrorMessage message={"Phone can't be empty"} />
                )}
              </div>

              {/* </div> *} */}
              <div className="basis-full sm:basis-[49%] flex flex-col font-nunito w-full">
                <SelectOptions
                  label="Highest Level of Education"
                  byDefault=""
                  className="  "
                  options={[
                    "Some high school",
                    "High school diploma or GED",
                    "Bachelor's degree ",
                    "Some graduate coursework",
                    "Graduate degree",
                  ]}
                  register={{ ...register("education", { required: true }) }}
                />
                {errors.education && (
                  <InputErrorMessage message={"Education can't be empty"} />
                )}
              </div>
              <div className="basis-full sm:basis-[49%] flex flex-col font-nunito ">
                <label className="mb-1 font-nunito text-small-text-color">
                  Linkedin
                </label>

                <input
                  className=" border-[0.5px] border-gray-200  rounded-r-[0.25rem] rounded-l-[0.25rem] px-[0.45rem] py-[0.45rem] bg-"
                  type={"text"}
                  // placeholder={placeholder}
                  // name={name}
                  {...register("linkedin", { required: true })}
                />
                {errors.linkedin && (
                  <InputErrorMessage message={"Linkedin URL can't be empty"} />
                )}
              </div>
              <div className="basis-full sm:basis-[49%] flex flex-col font-nunito">
                <label className="mb-1 font-nunito text-small-text-color">
                  City, State
                </label>

                <input
                  className=" border-[0.5px] border-gray-200  rounded-r-[0.25rem] rounded-l-[0.25rem] px-[0.45rem] py-[0.45rem] bg-"
                  type={"text"}
                  // placeholder={placeholder}
                  // name={name}
                  {...register("city", { required: true })}
                />
                {errors.city && (
                  <InputErrorMessage message={"City can't be empty"} />
                )}
              </div>
              <div className="basis-full sm:basis-[49%] flex flex-col font-nunito">
                <SelectOptions
                  label="Country"
                  className=""
                  byDefault=""
                  name="staffing-need"
                  options={allCountry}
                  register={{ ...register("country", { required: true }) }}
                />
                {errors.country && (
                  <InputErrorMessage message={"Country can't be empty"} />
                )}
              </div>
            </div>

            <div className="my-4 mx-1">
              <p className="mb-2  text-small-text-color">
                Message to Hiring Manager
              </p>
              <textarea
                placeholder="Type here..."
                aria-label="Message"
                rows={2}
                cols={85}
                className="border-2 p-2 rounded-l-[0.25rem] rounded-r-[0.25rem] border-gray-300 w-full"
                {...register("message", { required: true })}
              ></textarea>
              {errors.message && (
                <InputErrorMessage message={"Message can't be empty"} />
              )}
            </div>
            <div className="mx-1">
              <p className="mb-3 text-small-text-color">Upload Resume</p>
              <div className="flex flex-col lg:flex-row items-center">
                <div className="flex justify-center mt-1 items-center">
                  <label
                    className="text-white xsm:w-[7.5rem] lg:w-[9.5rem] justify-center items-center flex gap-3 bg-[#3A57E8] rounded-lg shadow-lg tracking-wide  cursor-pointer"
                    style={{ padding: "10px 0px" }}
                  >
                    <svg
                      className="h-7"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                    </svg>
                    <span className="text-base leading-normal">Upload</span>
                    <input onChange={FileGet} type="file" className="hidden" />
                  </label>
                  <span className="ml-2">
                    {Filename ? Filename : "No file chosen"}
                  </span>
                </div>
              </div>
              {uploadLoading && (
                <span className="text-bold ">File Uploading...</span>
              )}
            </div>

            <div className=" my-8 mx-1">
              <button
                type="submit"
                className={`text-white bg-[#0d4cf9] hover:bg-[#5177e0]/90 focus:ring-4 focus:outline-none focus:ring-[#0d4cf9]/50 font-medium rounded-lg text-sm px-14 py-3 text-center inline-flex items-center cursor-pointer  mr-2 mb-2 `}
              >
                {isLoading ? (
                  <>
                    <Spinner /> loading...
                  </>
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalProfileOptForm;

const SelectOptions = ({
  label,
  name,
  byDefault,
  onChange,
  className,
  options,
  register,
}: {
  label?: string | undefined;
  name?: string;
  byDefault?: string;
  onChange?: any;
  className?: string | undefined;
  options: string[];
  register: any;
}) => {
  return (
    <div className="">
      <label htmlFor="media" className="block mb-2  text-small-text-color">
        {label}
      </label>
      <select
        name={name}
        id="media"
        {...register}
        className="bg-gray-50 border rounded-l-[0.25rem] rounded-r-[0.25rem] border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      >
        <option disabled={true} value={""}>
          Select an Option
        </option>
        {options.map((item, id) => (
          <option value={item} key={id}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};
