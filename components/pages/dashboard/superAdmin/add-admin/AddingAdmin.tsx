"use client"
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useCreateSingleAdminMutation } from '../../../../../feature/api/dashboardApi';

enum Gender {
  male = 'male',
  female = 'female',
  other = 'other'
}

enum BloodGroup {
  A_POSITIVE = 'A+',
  A_NEGATIVE = 'A-',
  B_POSITIVE = 'B+',
  B_NEGATIVE = 'B-',
  AB_POSITIVE = 'AB+',
  AB_NEGATIVE = 'AB-',
  O_POSITIVE = 'O+',
  O_NEGATIVE = 'O-'
}

type AdminFormData = {
  password: string;
  admin: {
    designation: string;
    name: {
      firstName: string;
      middleName?: string;
      lastName: string;
    };
    gender: Gender;
    dateOfBirth: string; // Changed to string to handle input properly
    email: string;
    contactNo: string;
    emergencyContactNo: string;
    bloogGroup: BloodGroup;
    presentAddress: string;
    profileImg?: string;
  };
};

export const AddingAdmin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<AdminFormData>();

  const [addAdmin, { isLoading }] = useCreateSingleAdminMutation();

  const onSubmit = async (formData: AdminFormData) => {
    try {
      // Prepare the payload with proper date formatting
      const payload = {
        password: formData.password,
        admin: {
          ...formData.admin,
          dateOfBirth: new Date(formData.admin.dateOfBirth).toISOString()
        }
      };

      const result = await addAdmin(payload).unwrap();
      
      if (result) {
        toast.success("Admin created successfully!");
        reset();
      }
    } catch (err: any) {
      toast.error(
        err.data?.message || 
        err.message || 
        "Failed to create admin. Please try again."
      );
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Add New Admin</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Password Field */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            {...register("password", { 
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters"
              }
            })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.password && (
            <p className="text-red-500 text-xs italic">{errors.password.message}</p>
          )}
        </div>

        {/* Designation Field */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Designation
          </label>
          <input
            {...register("admin.designation", { 
              required: "Designation is required",
              maxLength: {
                value: 50,
                message: "Designation cannot exceed 50 characters"
              }
            })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.admin?.designation && (
            <p className="text-red-500 text-xs italic">{errors.admin.designation.message}</p>
          )}
        </div>

        {/* Name Fields */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <input
                placeholder="First Name"
                {...register("admin.name.firstName", { 
                  required: "First name is required",
                  maxLength: {
                    value: 20,
                    message: "First name cannot exceed 20 characters"
                  }
                })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {errors.admin?.name?.firstName && (
                <p className="text-red-500 text-xs italic">{errors.admin.name.firstName.message}</p>
              )}
            </div>
            <div>
              <input
                placeholder="Middle Name"
                {...register("admin.name.middleName")}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div>
              <input
                placeholder="Last Name"
                {...register("admin.name.lastName", { 
                  required: "Last name is required",
                  maxLength: {
                    value: 20,
                    message: "Last name cannot exceed 20 characters"
                  }
                })}
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
            {Object.values(Gender).map(gender => (
              <option key={gender} value={gender}>
                {gender.charAt(0).toUpperCase() + gender.slice(1)}
              </option>
            ))}
          </select>
          {errors.admin?.gender && (
            <p className="text-red-500 text-xs italic">{errors.admin.gender.message}</p>
          )}
        </div>

        {/* Date of Birth Field */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Date of Birth
          </label>
          <input
            type="date"
            {...register("admin.dateOfBirth", { 
              required: "Date of birth is required",
              valueAsDate: false // Changed to false since we're handling conversion manually
            })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.admin?.dateOfBirth && (
            <p className="text-red-500 text-xs italic">{errors.admin.dateOfBirth.message}</p>
          )}
        </div>

        {/* Email Field */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
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
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Contact Number
          </label>
          <input
            type="tel"
            {...register("admin.contactNo", { 
              required: "Contact number is required",
              pattern: {
                value: /^[0-9+]+$/,
                message: "Invalid phone number format"
              }
            })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.admin?.contactNo && (
            <p className="text-red-500 text-xs italic">{errors.admin.contactNo.message}</p>
          )}
        </div>

        {/* Emergency Contact Field */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Emergency Contact Number
          </label>
          <input
            type="tel"
            {...register("admin.emergencyContactNo", { 
              required: "Emergency contact is required",
              pattern: {
                value: /^[0-9+]+$/,
                message: "Invalid phone number format"
              }
            })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.admin?.emergencyContactNo && (
            <p className="text-red-500 text-xs italic">{errors.admin.emergencyContactNo.message}</p>
          )}
        </div>

        {/* Blood Group Field */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Blood Group
          </label>
          <select
            {...register("admin.bloogGroup", { required: "Blood group is required" })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select Blood Group</option>
            {Object.values(BloodGroup).map(group => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
          {errors.admin?.bloogGroup && (
            <p className="text-red-500 text-xs italic">{errors.admin.bloogGroup.message}</p>
          )}
        </div>

        {/* Present Address Field */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Present Address
          </label>
          <textarea
            {...register("admin.presentAddress", { 
              required: "Address is required",
              minLength: {
                value: 10,
                message: "Address should be at least 10 characters"
              }
            })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-20"
          />
          {errors.admin?.presentAddress && (
            <p className="text-red-500 text-xs italic">{errors.admin.presentAddress.message}</p>
          )}
        </div>

        {/* Profile Image Field */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Profile Image URL (Optional)
          </label>
          <input
            type="text"
            {...register("admin.profileImg", {
              pattern: {
                value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
                message: "Please enter a valid URL"
              }
            })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.admin?.profileImg && (
            <p className="text-red-500 text-xs italic">{errors.admin.profileImg.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-center">
          <button
            type="submit"
            disabled={isLoading}
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? 'Creating...' : 'Add Admin'}
          </button>
        </div>
      </form>
    </div>
  );
};