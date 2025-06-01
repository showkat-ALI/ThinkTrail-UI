import React, { useState, useEffect } from "react";
import { InputErrorMessage } from "../../../../../../utils/error";
import { useForm, useFormContext } from "react-hook-form";
import { useCreateSlideMutation } from "../../../../../../../feature/api/dashboardApi";
import { useSingleFileUploadMutation } from "../../../../../../../feature/api/mediaUploadApi";
import { toast } from "react-toastify";
import ButtonLoader from "../../../../../../utils/loaders/ButtonLoader";

const SlideCategory = ({
  id,
  setShowModal,
}: {
  id: string;
  setShowModal: any;
}) => {
  const [localFile, setlocalFile] = useState("");
  const [localFileKey, setlocalFileKey] = useState("");
  const [title, setTitle] = useState("");
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
  const [createSlide, { isError, error, data, isLoading, isSuccess }] =
    useCreateSlideMutation();

  const fileGet = async (e: any) => {
    const file = e.target.files;
    if (file && file.length > 0 && file["0"]) {
      const formData = new FormData();
      formData.append("file", file["0"]);
      singleFileupload(formData);
    } else if (
      file &&
      file.length > 0 &&
      file["0"].type.substr(0, 5) !== "file"
    ) {
      console.log("error");
    }
  };

  useEffect(() => {
    if (isUploadError) {
      //   console.log("upload error", uploadError);
      toast.error("file upload failed");
    } else if (isUploadSuccess) {
      setlocalFile(uploadData.data.fileUrl);
      setlocalFileKey(uploadData.data.key);
      // console.log("upload success", uploadData);
      toast.success("upload file success");
    }
  }, [isUploadError, isUploadSuccess]);

  const slideSubmit = (e: any) => {
    e.preventDefault();
    createSlide({
      module: id,
      fileUrl: localFile,
      key: localFileKey,
      title: title,
    });
  };
  useEffect(() => {
    if (isError) {
      toast.error("Slide Moudle has added error");
      // console.log(error);
    } else if (isSuccess) {
      //  console.log(data);
      setShowModal(false);
      toast.success("Slide Module has Added Successfully!");
      // console.log(data);
    }
  }, [isError, isSuccess]);
  return (
    <div>
      <form>
        <div className="mb-2">
          <p className="text-[#8A92A6] text-[16px] mb-3 leading-[19px]">
            Select the slide you want to associate with this module or add an
            slide by selecting “upload”
          </p>
        </div>
        <div
          className="p-5"
          style={{ boxShadow: "0px 1px 15px rgba(0, 0, 0, 0.15)" }}
        >
          <div className="flex flex-col mb-2">
            <label className="font-medium text-base mb-2">Title</label>
            <input
              onChange={(e) => setTitle(e.target.value)}
              name="title"
              type="text"
              placeholder="Enter title"
              style={{ boxShadow: "0px 1px 15px rgba(0, 0, 0, 0.15)" }}
              className="border-none mb-2"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Enter file
            </label>
            <input
              onChange={fileGet}
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="file_input"
              type="file"
            />
          </div>
          <div className="mt-5">
            <p className="text-[#3A57E8] font-medium">
              {uploadLoading && "uploading..."}
              {isUploadSuccess && "Upload Completed"}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-end p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
          <button
            onClick={() => setShowModal(false)}
            data-modal-hide="staticModal"
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Cancel
          </button>
          <button
            disabled={isLoading}
            onClick={slideSubmit}
            data-modal-hide="staticModal"
            className="flex items-center justify-center text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
          >
            {isLoading ? <ButtonLoader /> : "Add Item"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SlideCategory;
