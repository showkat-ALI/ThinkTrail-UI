/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import { Modal, Select, Button } from "flowbite-react";
import { ChangeEvent, useEffect, useState } from "react";
import { FormTextInput } from "../../../../utils/form/Inputs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useUpdateUserMutation } from "../../../../../feature/api/dashboardApi";
import { useSinglePhotoUploadMutation } from "../../../../../feature/api/mediaUploadApi";
import { toast } from "react-toastify";
import ButtonLoader from "../../../../utils/loaders/ButtonLoader";
import { MdEdit } from "react-icons/md";

const Schema = z.object({
  firstName: z.string().min(1, "First name is required!"),
  lastName: z.string().min(1, "Last name is required!"),
  email: z.string().email("Email is required!"),
  phone: z.string().min(1, "Phone number is required!"),
  userName: z.string(),
});

type FormData = {
  avatar: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  userName: string;
};

type props = {
  show: boolean;
  handleClose: () => void;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    avatar: string;
    userName: string;
    email: string;
    contact: string;
    status: string;
  };
};

const EditUserModal = (props: props) => {
  const {
    show,
    handleClose,
    user: { avatar, id, firstName, lastName, userName, contact, email },
  } = props;

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(Schema),
    defaultValues: {
      firstName,
      lastName,
      phone: contact,
      email,
      userName,
    },
  });

  const [
    updateUser,
    {
      error: updateUserError,
      isLoading: isUpdateUserLoading,
      isSuccess: isUpdateUserSuccess,
      isError: isUpdateUserError,
    },
  ] = useUpdateUserMutation();

  const updateUserHandler = (data: FormData) => {
    if (filePreview) {
      data.avatar = filePreview;
    }
    updateUser({ id, user: data });
  };

  const [
    singlePhotoUpload,
    {
      error: uploadError,
      data: uploadData,
      isSuccess: isUploadSuccess,
      isError: isUploadError,
    },
  ] = useSinglePhotoUploadMutation();
  const [filePreview, setFilePreview] = useState("");

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    if (file && file.length > 0 && file["0"].type.substr(0, 5) === "image") {
      const formData = new FormData();
      formData.append("image", file["0"]);
      singlePhotoUpload(formData);
    } else if (
      file &&
      file.length > 0 &&
      file["0"].type.substr(0, 5) !== "image"
    ) {
      toast.error("Select a valid image.");
      console.log("img", watch("avatar"));
    }
  };

  useEffect(() => {
    if (isUploadError) {
      console.log("upload error", uploadError);
      toast.error((uploadError as any).data.message);
    } else if (isUploadSuccess) {
      console.log("upload success", uploadData);
      setFilePreview(uploadData.data.image);
    }

    if (isUpdateUserError) {
      console.log("update user error", updateUserError);
      toast.error((updateUserError as any).data.message);
    } else if (isUpdateUserSuccess) {
      // console.log("updated user", updatedUserData);
      toast.success("User Information Updated Successfully!");
      handleClose();
    }
  }, [isUploadError, isUploadSuccess, isUpdateUserError, isUpdateUserSuccess]);

  return (
    <Modal show={show} size="lg" popup={true} onClose={handleClose}>
      <form onSubmit={handleSubmit(updateUserHandler)} className="font-nunito">
        <Modal.Header></Modal.Header>
        <Modal.Body>
          <div className="space-y-2 px-4 pb-4 sm:pb-6">
            <div className="mb-5 flex items-center space-x-7">
              <div className="space-y-2">
                <label className="block text-[#232D42]" htmlFor={"avatar"}>
                  {"Avatar"}
                </label>
                <div className="w-[120px] h-[120px] relative rounded border-8 border-[#f9f9f9] bg-[#f9f9f9]">
                  <img
                    className="w-full h-full object-cover"
                    src={
                      filePreview && typeof filePreview === "string"
                        ? filePreview
                        : avatar
                    }
                    alt="avatar"
                  />
                  <div className="w-[30px] h-[30px] absolute top-1 right-[-23px]">
                    <button className="relative w-full h-full text-white bg-[#3A57E8] rounded-full flex items-center justify-center overflow-hidden">
                      <MdEdit />
                      <input
                        className="absolute opacity-0 top-0 left-0 scale-150"
                        type="file"
                        id={"avatar"}
                        onChange={handleAvatarChange}
                      />
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-[#8A92A6]">
                  Allowed file type : png, jpg, jpeg
                </p>
              </div>
            </div>
            <FormTextInput
              name="firstName"
              register={register}
              error={errors.firstName?.message}
              placeholder="First name"
              label="First name"
            />
            <FormTextInput
              name="lastName"
              register={register}
              error={errors.lastName?.message}
              placeholder="Last name"
              label="Last name"
            />
            <FormTextInput
              name="userName"
              register={register}
              error={errors.userName?.message}
              placeholder="Username"
              label="Username"
            />
            <FormTextInput
              name="email"
              register={register}
              error={errors.email?.message}
              placeholder="email address"
              label="Email address"
            />
            <FormTextInput
              name="phone"
              register={register}
              error={errors.phone?.message}
              placeholder="Phone number"
              label="Phone number"
            />
            <div className="w-full flex flex-wrap gap-2">
              <div>
                <Button type="submit">
                  {isUpdateUserLoading ? <ButtonLoader /> : "Save"}
                </Button>
              </div>
              <div>
                <Button onClick={handleClose} color="failure">
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </form>
    </Modal>
  );
};

export default EditUserModal;
