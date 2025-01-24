import React from "react";
import Textfield from "../../../common/forms/Textfield";
import Image from "next/image";

const StaffFrom = () => {
  return (
    <div className="container font-nunito">
      <div className="p-[2rem] mt-[-260px]  lg:mt-[-465px] bg-white container md:max-w-[1080px]  pt-16 mb-20 shadow-slate-300 shadow-xl rounded-xl">
        <div className="">
          <div className="flex justify-center items-center">
            <h1 className="text-4xl font-semibold ">Staffing</h1>
          </div>
          <div>
            <div className="text-sm flex lg:items-center md:items-center lg:justify-center md:justify-center flex-col my-5 text-gray-400">
              <p className="max-w-[500px] text-center">
                Are you skilled in a specific field in Information Technology
                and interested in teaching and impacting lives with your
                professional experiences? Come join our team!
              </p>
            </div>
          </div>
        </div>
        <div className=" ">
          <div className="flex justify-center items-center flex-wrap gap-3">
            <div className="basis-full sm:basis-[49%]">
              <Textfield className="" label="First Name" name="first name" />
            </div>
            <div className="basis-full sm:basis-[49%]">
              <Textfield
                className="basis-full sm:basis-[49%]"
                label="Last Name"
                name=" Second name"
              />
            </div>
            <div className="basis-full sm:basis-[49%]">
              <Textfield
                className="basis-full sm:basis-[49%]"
                label="Email Address"
                name="Email Address"
                type="email"
              />
            </div>
            <div className="basis-full sm:basis-[49%]">
              <Textfield
                className="basis-full sm:basis-[49%]"
                label="Phone"
                name="phone"
                type="tel"
              />
            </div>

            <div className="basis-full sm:basis-[49%] mt-3">
              <SelectOptions
                byDefault=""
                name="staffing-need"
                options={["Instructor", "HR", "Sponsor", "Consulting"]}
              />
            </div>
            <div className="basis-full sm:basis-[49%] mt-3">
              <SelectOptions
                byDefault=""
                name="staffing-need"
                options={["Instructor", "HR", "Sponsor", "Consulting"]}
              />
            </div>
          </div>
          <div className="my-4 mx-1 ">
            <p className="mb-2  text-small-text-color">
              Message to Hiring Manager
            </p>
            <textarea
              placeholder="Type here..."
              aria-label="Message"
              rows={2}
              cols={85}
              name="Message"
              className="border-2 p-2 rounded-l-[0.25rem] rounded-r-[0.25rem] border-gray-300 w-full"
            ></textarea>
          </div>
          <div className="mx-1">
            <SelectOptions
              label=" Staffing needs"
              byDefault=""
              className="w-[49%]"
              name="staffing-need"
              options={["Instructor", "HR", "Sponsor", "Consulting"]}
            />
          </div>

          <div className="mx-1 my-8">
            <button
              type="button"
              className="text-white bg-[#0d4cf9] hover:bg-[#5177e0]/90 focus:ring-4 focus:outline-none focus:ring-[#0d4cf9]/50 font-medium rounded-lg text-sm px-14 py-3 text-center inline-flex items-center  mr-2 mb-2"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffFrom;

const SelectOptions = ({
  label,
  name,
  byDefault,
  onChange,
  className,
  options,
}: {
  label?: string | undefined;
  name: string;
  byDefault: string;
  onChange?: any;
  className?: string | undefined;
  options: string[];
}) => {
  return (
    <div className={`${className} rounded-l-[0.25rem] rounded-r-[0.25rem]`}>
      <label htmlFor="media" className="block   text-small-text-color">
        {label}
      </label>
      <select
        name={name}
        id="media"
        className="bg-gray-50 border border-gray-300 rounded-l-[0.25rem] rounded-r-[0.25rem] text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      >
        <option defaultValue={byDefault}>{byDefault}</option>

        {options.map((item, id) => (
          <option value={item} key={id}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};
