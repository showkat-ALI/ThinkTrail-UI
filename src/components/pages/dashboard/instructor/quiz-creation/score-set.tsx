import React, { useState } from "react";
// import TagsInput from "react-tag-input";

const ScoreSet = () => {
  const [selected, setSelected] = useState(["Everyone"]);

  return (
    <div className="bg-white flex   flex-col pb-10 pt-4 px-5">
      <div className="w-4/5 ">
        <SelectOptions
          label="Score per question "
          className=""
          byDefault="Unlimited"
          name="staffing-need"
          options={["True false", "Checkbox", "Text"]}
        />
      </div>
      <div className="w-4/5 my-5">
        <SelectOptions
          label="Question displayed per page"
          className=""
          byDefault="Unlimited"
          name="staffing-need"
          options={["True false", "Checkbox", "Text"]}
        />
      </div>
      <div className="w-4/5 flex justify-between">
        <label className="flex items-center">
          <input type="checkbox" className="text-blue-600 p-2 border-black" />
        </label>
        <p className="font-semibold">Question sorted randomly</p>
      </div>
      <div className="my-5">
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" value="" className="sr-only peer" checked />
          <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          <span className="ml-3 text-sm font-bold text-gray-900 dark:text-gray-300">
            Required
          </span>
        </label>
      </div>
    </div>
  );
};

export default ScoreSet;
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
    <div className="">
      <label htmlFor="media" className="block mb-3 font-bold  text-blue-600">
        {label}
      </label>
      <select
        name={name}
        id="media"
        className=" bg-gray-50 border rounded-l-[0.25rem] rounded-r-[0.25rem]   border-blue-600 text-sm  focus:ring-blue-500 focus:border-blue-500  w-full p-2.5 flex flex-col justify-between "
      >
        <option defaultValue={byDefault}>{byDefault}</option>
        {options.map((item, id) => (
          <>
            <option value={item} key={id} className="p-4 my-3">
              {item}
            </option>
            <hr className="w-2" />
          </>
        ))}
      </select>
    </div>
  );
};
