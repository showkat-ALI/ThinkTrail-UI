import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { StepPropss } from "./Creation1";
import { InputErrorMessage } from "../../../../../utils/error";
import { useSingleFileUploadMutation } from "../../../../../../feature/api/mediaUploadApi";

// icon
import DeleteIcon from "../../../../../../assets/Delete.png";

type FormValues = {
  videoUrl: string;
  fileUrl: string;
};

const Creation2 = (props: StepPropss) => {
  const { setStep, setFormData, formData, step } = props;
  const [filePreview, setFilePreview] = useState(formData.courseImage || "");
  const [picsname, setpicsname] = useState("");

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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      videoUrl: formData.videoUrl,
    },
  });

  const onPrev = () => {
    setStep(step - 1);
  };

  const imageGet = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const picked = files[0];
    setpicsname(picked.name);

    if (picked.type.startsWith("image")) {
      const uploadFormData = new FormData();
      uploadFormData.append("file", picked);
      singleFileupload(uploadFormData);
    } else {
      toast.error("Select a valid image.");
    }
  };

  useEffect(() => {
    if (isUploadError) {
      toast.error((uploadError as any)?.data?.message || "Upload failed");
    } else if (isUploadSuccess) {
      setFilePreview(uploadData?.data?.fileUrl || "");
      toast.success("Upload success");
    }
  }, [isUploadError, isUploadSuccess, uploadData, uploadError]);

  const submitSecondStep = (data: FormValues) => {
    const uploadedOrExistingImage = filePreview || formData.courseImage;
    if (!uploadedOrExistingImage) {
      toast.error("Please upload a course image first.");
      return;
    }

    const nextData = {
      ...formData,
      ...data,
      courseImage: uploadedOrExistingImage,
    };

    setFormData((prev: object) => ({ ...prev, ...nextData }));
    setStep(3);
  };

  return (
    <>
      <form onSubmit={handleSubmit(submitSecondStep)}>
        <div className="course_media  p-3 mt-5">
          <h2 className="font-semibold text-2xl mb-5">Course Media</h2>
          <div className="Course_media_form border border-dashed p-5 border-black">
            <div className="upload_image_input flex flex-col">
              <label className="mb-2 text-base font-medium">
                Upload course image
              </label>
              <div className="flex flex-col md:flex-row justify-center gap-2 items-center">
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
                  <input
                    {...register("fileUrl")}
                    onChange={imageGet}
                    type="file"
                    className="hidden"
                  />
                </label>
                <span className="text-[#727272] text-sm">
                  {picsname ? picsname : "No file choosen"}
                </span>
              </div>
              <div className="text-right mt-3">
                <button type="button">
                  <Image src={DeleteIcon} width={24} height={27} alt="" />
                </button>
              </div>
            </div>
          </div>
          <div className="mt-1">
            <p className="text-[#3A57E8] font-medium">
              {uploadLoading && "uploading..."}
              {isUploadSuccess && "Upload Completed"}
            </p>
            {errors.fileUrl && <InputErrorMessage message={"Enter Image"} />}
          </div>
          <div
            className="upload_image_details flex justify-between bg-[#CDEBEC] mt-10 mb-8 flex-col sm:flex-row items-center sm:items-start"
            style={{ padding: "12px 21px" }}
          >
            <div className="flex items-center gap-2">
              <span className="text-[8px] sm:text-[10px] lg:text-[13px] font-normal text-[#056C71]">
                Accepted file types:
              </span>
              <span className="text-[8px]  sm:text-[10px] lg:text-[13px] font-normal text-black">
                PNG,JPG,JPEG
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[8px]  sm:text-[10px] lg:text-[13px] text-[#056C71]">
                Suggested dimensions:
              </span>
              <span className="text-[8px]  sm:text-[10px] lg:text-[13px] text-black">
                600px*450px
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[8px]  sm:text-[10px] lg:text-[13px] text-[#056C71]">
                Large image crop to:
              </span>
              <span className="text-[8px]  sm:text-[10px] lg:text-[13px] text-black">
                4:3
              </span>
            </div>
          </div>
          <div className="upload_video_url flex flex-col mb-5">
            <label className="text-base font-medium mb-3">Upload video</label>
            <input
              {...register("videoUrl", { required: true })}
              placeholder="Enter Video Url"
              className="p-3"
              style={{ boxShadow: "0px 1px 15px rgba(0, 0, 0, 0.15)" }}
            />
            <div>
              {errors.videoUrl && (
                <InputErrorMessage
                  message={
                    "Note: https://www.youtube-nocookie.com/embed/dFUYsbbf6U0"
                  }
                />
              )}
            </div>
          </div>

          <div className="btn flex justify-end gap-5">
            <button
              type="button"
              className="xsm:w-full lg:w-[8rem] bg-[#EBEEFD] border border-[#3A57E8] py-2 px-6 rounded-sm"
              onClick={onPrev}
            >
              Previous
            </button>
            <button
              type="submit"
              className="xsm:w-full flex justify-center lg:w-[7rem] bg-[#3A57E8] py-2 px-6 text-[#fff] rounded-sm"
            >
              Next
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Creation2;
