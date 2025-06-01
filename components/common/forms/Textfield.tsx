import React from "react";

const Textfield = ({
  label,
  type = "text",
  placeholder,
  name,
  onChange,
  className,
  others,
}: {
  label: string;
  type?: string | undefined;
  placeholder?: string;
  name?: string | undefined;
  onChange?: any;
  className?: string;
  others?: any;
}) => {
  return (
    <div className={"flex flex-col font-nunito " + className}>
      <label className="mb-1 font-nunito text-small-text-color" htmlFor={name}>
        {label}:
      </label>

      <input
        className=" border-[0.5px] border-gray-200  rounded-r-[0.25rem] rounded-l-[0.25rem] px-[0.45rem] py-[0.45rem] bg-"
        type={type}
        placeholder={placeholder}
        name={name}
        {...others}
      />
    </div>
  );
};

export default Textfield;
