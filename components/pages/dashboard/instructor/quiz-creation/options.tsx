import React, { useState } from "react";

import { useForm } from "react-hook-form";
import {
  useCreateQuizMutation,
  useGetCategoriesQuery,
} from "../../../../../feature/api/dashboardApi";

function Options() {
  const [createQuiz, { error, data, isLoading: loading, isSuccess: success }] =
    useCreateQuizMutation();
  const [Id, setGetId] = useState("");
  let singleQuiz;
  loading ? (
    <div>Loading....</div>
  ) : error ? (
    <div>Error....</div>
  ) : success && data?.data?.quiz ? (
    (singleQuiz = data.data.quiz)
  ) : (
    <div>No categories found</div>
  );
  setGetId(singleQuiz?.id);
  const [toggle, setToggle] = useState(true);

  const {
    data: allcategory,
    isSuccess,
    isError,
    isLoading,
  } = useGetCategoriesQuery({});

  // console.log(error);
  // console.log(isSuccess);
  let singleCategory;
  isLoading ? (
    <div>Loading....</div>
  ) : isError ? (
    <div>Error....</div>
  ) : isSuccess &&
    allcategory?.data?.categories &&
    allcategory.data.categories.length > 0 ? (
    (singleCategory = allcategory.data.categories)
  ) : (
    <div>No categories found</div>
  );
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => {
    // console.log(data);
    createQuiz(data);
    // console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input
          type="text"
          className="mt-3"
          placeholder="Enter course time"
          {...register("title")}
          style={{
            background: " #FFFFFF",
            boxShadow: "0px 1px 15px rgb(0 0 0 / 15%)",
            borderRadius: "8px",
            width: "100%",
            border: "none",
            padding: " 11px 17px",
          }}
        />
      </div>
      <div className="bg-white flex mt-5 lg:mt-0 md:mt-0   flex-col px-5 py-3">
        <div className="w-4/5 ">
          <Category
            label="Category"
            className=""
            register={register}
            byDefault="Unlimited"
            name="category"
            options={singleCategory}
          />
        </div>
        <div className="w-4/5 my-4">
          <SelectOptions
            label="Quiz Type"
            className=""
            byDefault="Unlimited"
            register={register}
            name="type"
            options={["True false", "Checkbox", "Text"]}
          />
        </div>
        <div className="w-4/5 ">
          <SelectOptions
            label="Question Attempts"
            className=""
            byDefault="Unlimited"
            name="attempts"
            register={register}
            options={[5, 7, 8]}
          />
        </div>
      </div>
      <div className="my-5">
        <div className="bg-white flex   flex-col pb-10 pt-4 px-5">
          <div className="w-4/5 ">
            <SelectOptions
              label="Score per question "
              className=""
              byDefault="Unlimited"
              name="scorePerQuestion"
              register={register}
              options={[5, 3, 4]}
            />
          </div>
          <div className="w-4/5 my-5">
            <SelectOptions
              label="Question displayed per page"
              className=""
              byDefault="Unlimited"
              name="questionPerPage"
              register={register}
              options={[5, 3, 4]}
            />
          </div>
          <div className="w-4/5 flex justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                {...register("isSort")}
                className="text-blue-600 p-2 border-black"
              />
            </label>
            <p className="font-semibold">Question sorted randomly</p>
          </div>
          <div className="my-5">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                {...register("isRequired")}
              />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              <span className="ml-3 text-sm font-bold text-gray-900 dark:text-gray-300">
                Required
              </span>
            </label>
          </div>
        </div>
      </div>
      <div className="bg-white flex mt-5  flex-col px-5 py-7">
        <div className="flex justify-between items-center">
          <div className="my-8">
            <label htmlFor="startDate" className="font-semibold">
              Start Date
            </label>
            <br />
            <input
              className="border border-blue-400 rounded-lg px-5 py-2 text-blue-500"
              type="date"
              id="startDate"
              // {...register("startDate", { required: "start date is required" })}
              {...register("startDate", { required: "start date is required" })}
            />
            {errors.startDate && (
              <div className="text-xs text-red-600">start date is required</div>
            )}
          </div>
          <div className=" lg:ml-0 ml-5">
            <label htmlFor="startTime " className="font-semibold mb-2">
              Start Time
            </label>
            <br />

            <input
              className="border border-blue-400 rounded-lg px-5 py-2 text-blue-500"
              type="time"
              id="startTime"
              {...register("startTime", { required: "start time is required" })}
            />
            {errors.startTime && (
              <div className="text-xs text-red-600">start time is required</div>
            )}
          </div>
        </div>
        <div className="w-full">
          <label htmlFor="until " className="font-semibold mb-2">
            Time Allowed
          </label>
          <br />

          <input
            type="time"
            className="border border-blue-400 rounded-lg px-5 py-2 text-blue-500"
            id="timeAllowed"
            {...register("timeAllowed", { required: "end time is required" })}
          />
          {errors.timeAllowed && (
            <div className="text-xs text-red-600">end time is required</div>
          )}
        </div>
      </div>
      <div className="mt-5 ">
        <input
          type={"submit"}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm lg:px-5 px-2  py-2.5 mr-2 mb-2"
        />
      </div>
    </form>
  );
}
export { Options };
const Category = ({
  label,
  name,
  byDefault,
  onChange,
  className,
  register,
  options,
}: {
  label?: string | undefined;
  name: string;
  byDefault: string;
  onChange?: any;
  className?: string | undefined;
  options: any;
  register: any;
}) => {
  return (
    <div className="">
      <label htmlFor="category" className="block mb-3 font-bold  text-blue-600">
        {label}
      </label>
      <select
        name={name}
        {...register(name)}
        id="category"
        className=" bg-gray-50 border rounded-l-[0.25rem] rounded-r-[0.25rem]   border-blue-600 text-sm  focus:ring-blue-500 focus:border-blue-500  w-full p-2.5 flex flex-col justify-between "
      >
        {options?.length > 0 &&
          options?.map((item: any, id: any) => (
            <option
              value={item.id}
              key={id}
              className="p-4 my-3 border border-b-2 border-black"
            >
              {item.name}
            </option>
          ))}
      </select>
    </div>
  );
};
const SelectOptions = ({
  label,
  name,
  byDefault,
  onChange,
  className,
  register,
  options,
}: {
  label?: string | undefined;
  name: string;
  byDefault: string;
  onChange?: any;
  className?: string | undefined;
  options: any;
  register: any;
}) => {
  return (
    <div className="">
      <label htmlFor="media" className="block mb-3 font-bold  text-blue-600">
        {label}
      </label>
      <select
        name={name}
        {...register(name)}
        id="media"
        className=" bg-gray-50 border rounded-l-[0.25rem] rounded-r-[0.25rem]   border-blue-600 text-sm  focus:ring-blue-500 focus:border-blue-500  w-full p-2.5 flex flex-col justify-between "
      >
        {options.map((item: any, id: any) => (
          <>
            {/* <option defaultValue={options[0]}>{options[0]}</option> */}
            <option value={item} key={id} className="p-4 my-3">
              {item}
            </option>
          </>
        ))}
      </select>
    </div>
  );
};
