import { useForm } from "react-hook-form";
import Textfield from "../../../../common/forms/Textfield";
import { SelectOptions } from "../../BottomRegisForm";
import { useFormContext } from "react-hook-form";
import { BsFillEnvelopeFill } from "react-icons/bs";
import { InputErrorMessage } from "../../../../utils/error";
import { StepProps } from "../firstStep/FirstStep";
// import { useGetStatesQuery } from "../../../../../feature/api/dashboardApi";
// import { useGetAccessUniversalQuery } from "../../../../../feature/api/dashboardApi";
// import { useGetAccessTokenQuery } from "../../../../../feature/api/statesApi";

type RegistrationSecondStepFromData = {
  email: string;
  state: string;
  country: string;
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
      state: formData.state,
      country: formData.country,
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
          {...register("state", { required: true })}
          id="media"
          className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 lg:w-full xl:w-full md:w-full sm:w-full xsm:w-3/4 xl:p-2.5 lg:p-2.5 md:p-2.5 sm:p-2.5 xsm:p-2"
        >
          <option value={""}>{"Select Your State"}</option>
          {[
            "Alabama",
            "Alaska",
            "Arizona",
            "Arkansas",
            "California",
            "Colorado",
            "Connecticut",
            "Delaware",
            "Florida",
            "Georgia",
            "Hawaii",
            "Idaho",
            "Illinois",
            "Indiana",
            "Iowa",
            "Kansas",
            "Kentucky",
            "Louisiana",
            "Maine",
            "Maryland",
            "Massachusetts",
            "Michigan",
            "Minnesota",
            "Mississippi",
            "Missouri",
            "Montana",
            "Nebraska",
            "Nevada",
            "New Hampshire",
            "New Jersey",
            "New Mexico",
            "New York",
            "North Carolina",
            "North Dakota",
            "Ohio",
            "Oklahoma",
            "Oregon",
            "Pennsylvania",
            "Rhode Island",
            "South Carolina",
            "South Dakota",
            "Tennessee",
            "Texas",
            "Utah",
            "Vermont",
            "Virginia",
            "Washington",
            "West Virginia",
            "Wisconsin",
            "Wyoming",
          ].map((item, id) => (
            <option value={item} key={id}>
              {item}
            </option>
          ))}
        </select>
        {errors.state && <InputErrorMessage message={"select your state"} />}

        <select
          {...register("country", { required: true })}
          id="media"
          className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 lg:w-full xl:w-full md:w-full sm:w-full xsm:w-3/4 xl:p-2.5 lg:p-2.5 md:p-2.5 sm:p-2.5 xsm:p-2"
        >
          <option value={""}>{"Select Your Country"}</option>
          {[
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
            "Cambodia",
            "Cameroon",
            "Canada",
            "Cape Verde",
            "Central African Republic",
            "Chad",
            "Chile",
            "China",
            "Colombia",
            "Comoros",
            "Congo",
            "Costa Rica",
            "Croatia",
            "Cuba",
            "Cyprus",
            "Czechia",
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
            "Eswatini",
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
            "North Macedonia",
            "Norway",
            "Oman",
            "Pakistan",
            "Palau",
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
            "Sweden",
            "Switzerland",
            "Syria",
            "Taiwan",
            "Tajikistan",
            "Tanzania",
            "Thailand",
            "Timor-Leste (East Timor)",
            "Togo",
            "Tonga",
            "Trinidad and Tobago",
            "Tunisia",
            "Turkey",
            "Turkmenistan",
            "Tuvalu",
            "Uganda",
            "Ukraine",
            "United Arab Emirates (UAE)",
            "United Kingdom (UK)",
            "United States of America (USA)",
            "Uruguay",
            "Uzbekistan",
            "Vanuatu",
            "Vatican City (Holy See)",
            "Venezuela",
            "Vietnam",
            "Yemen",
            "Zambia",
            "Zimbabwe",
          ].map((item, id) => (
            <option value={item} key={id}>
              {item}
            </option>
          ))}
        </select>
        {errors.country && (
          <InputErrorMessage message={"select your country"} />
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
