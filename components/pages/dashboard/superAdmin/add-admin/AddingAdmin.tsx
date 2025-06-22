"use client"
import React from 'react';
import { useForm } from 'react-hook-form';
import { useCreateSingleAdminMutation } from '../../../../../feature/api/dashboardApi';
import { toast } from 'react-toastify';

type AdminFormData = {
  password: string;
  admin: {
    designation: string;
    name: {
      firstName: string;
      middleName: string;
      lastName: string;
    };
    gender: string;
    dateOfBirth: string;
    email: string;
    contactNo: string;
    emergencyContactNo: string;
    bloogGroup: string;
    presentAddress: string;
  };
};

export const AddingAdmin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminFormData>();
const [
    addAdmin,
    {
      data,
      isSuccess,
      isError,
      isLoading,
      error,
    },
  ] = useCreateSingleAdminMutation();
  const onSubmit = (data: AdminFormData) => {
    addAdmin(data);
    if(isSuccess){
        toast.success("Admin Created SuccessFully")
    }
    else if(isError){
        toast.error("Admin Creation Error")
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Add New Admin</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Password Field */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            {...register("password", { required: "Password is required" })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.password && (
            <p className="text-red-500 text-xs italic">{errors.password.message}</p>
          )}
        </div>

        {/* Designation Field */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="designation">
            Designation
          </label>
          <input
            id="designation"
            {...register("admin.designation", { required: "Designation is required" })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.admin?.designation && (
            <p className="text-red-500 text-xs italic">{errors.admin.designation.message}</p>
          )}
        </div>

        {/* Name Fields */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
          <div className="flex space-x-2">
            <div className="flex-1">
              <input
                placeholder="First Name"
                {...register("admin.name.firstName", { required: "First name is required" })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {errors.admin?.name?.firstName && (
                <p className="text-red-500 text-xs italic">{errors.admin.name.firstName.message}</p>
              )}
            </div>
            <div className="flex-1">
              <input
                placeholder="Middle Name"
                {...register("admin.name.middleName")}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="flex-1">
              <input
                placeholder="Last Name"
                {...register("admin.name.lastName", { required: "Last name is required" })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {errors.admin?.name?.lastName && (
                <p className="text-red-500 text-xs italic">{errors.admin.name.lastName.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Gender Field */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Gender</label>
          <select
            {...register("admin.gender", { required: "Gender is required" })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.admin?.gender && (
            <p className="text-red-500 text-xs italic">{errors.admin.gender.message}</p>
          )}
        </div>

        {/* Date of Birth Field */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dateOfBirth">
            Date of Birth
          </label>
          <input
            id="dateOfBirth"
            type="date"
            {...register("admin.dateOfBirth", { required: "Date of birth is required" })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.admin?.dateOfBirth && (
            <p className="text-red-500 text-xs italic">{errors.admin.dateOfBirth.message}</p>
          )}
        </div>

        {/* Email Field */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register("admin.email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address"
              }
            })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.admin?.email && (
            <p className="text-red-500 text-xs italic">{errors.admin.email.message}</p>
          )}
        </div>

        {/* Contact Number Field */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contactNo">
            Contact Number
          </label>
          <input
            id="contactNo"
            type="tel"
            {...register("admin.contactNo", { required: "Contact number is required" })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.admin?.contactNo && (
            <p className="text-red-500 text-xs italic">{errors.admin.contactNo.message}</p>
          )}
        </div>

        {/* Emergency Contact Field */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="emergencyContactNo">
            Emergency Contact Number
          </label>
          <input
            id="emergencyContactNo"
            type="tel"
            {...register("admin.emergencyContactNo", { required: "Emergency contact is required" })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.admin?.emergencyContactNo && (
            <p className="text-red-500 text-xs italic">{errors.admin.emergencyContactNo.message}</p>
          )}
        </div>

        {/* Blood Group Field */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bloogGroup">
            Blood Group
          </label>
          <select
            id="bloogGroup"
            {...register("admin.bloogGroup", { required: "Blood group is required" })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
          {errors.admin?.bloogGroup && (
            <p className="text-red-500 text-xs italic">{errors.admin.bloogGroup.message}</p>
          )}
        </div>

        {/* Present Address Field */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="presentAddress">
            Present Address
          </label>
          <textarea
            id="presentAddress"
            {...register("admin.presentAddress", { required: "Address is required" })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-20"
          />
          {errors.admin?.presentAddress && (
            <p className="text-red-500 text-xs italic">{errors.admin.presentAddress.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add Admin
          </button>
        </div>
      </form>
    </div>
  );
};