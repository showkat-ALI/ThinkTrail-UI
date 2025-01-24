import React, { useState } from "react";
// import TagsInput from "react-tag-input";

const Category = () => {
  const [selected, setSelected] = useState(["Everyone"]);

  return (
    <div className="bg-white flex mt-5 lg:mt-0 md:mt-0   flex-col px-5 py-3">
      <div className="w-4/5 ">
        <SelectOptions
          label="Category"
          className=""
          byDefault="Unlimited"
          name="staffing-need"
          options={["True false", "Checkbox", "Text"]}
        />
      </div>
      <div className="w-4/5 my-4">
        <SelectOptions
          label="Quiz Type"
          className=""
          byDefault="Unlimited"
          name="staffing-need"
          options={["True false", "Checkbox", "Text"]}
        />
      </div>
      <div className="w-4/5 ">
        <SelectOptions
          label="Question Attempts"
          className=""
          byDefault="Unlimited"
          name="staffing-need"
          options={["True false", "Checkbox", "Text"]}
        />
      </div>
    </div>
  );
};

export default Category;
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
