import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

interface EditUserModalProps {
  onSubmit: (updatedUser: { name: string; email: string }) => void;
  editUser: User | null;
  onClose: () => void;
  apiError: string;
}

// Zod schema for validation
const userSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
});

type UserFormData = z.infer<typeof userSchema>;

const EditUserModal: React.FC<EditUserModalProps> = ({ onSubmit, editUser, onClose, apiError }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    // reset,
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: editUser?.name || "",
      email: editUser?.email || "",
    },
  });

  // React.useEffect(() => {
  //   if (editUser) {
  //     reset({
  //       name: editUser.name,
  //       email: editUser.email,
  //     });
  //   }
  // }, [editUser, reset]);

  const submitHandler = (data: UserFormData) => {
    onSubmit(data);
  };

  if (!editUser) return null;

  return (
    <>
      <h2 className="text-lg font-bold mb-4">Edit User</h2>
      <form onSubmit={handleSubmit(submitHandler)}>
        <div className="mb-4">
          <input className="w-full border p-2" type="text" {...register("name")} placeholder="Name" />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>

        <div className="mb-4">
          <input className="w-full border p-2" type="email" {...register("email")} placeholder="Email" />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          {!errors.email && apiError && <p className="text-red-500 text-sm mt-1">{apiError}</p>}
        </div>

        <div className="flex justify-end space-x-2">
          <button type="button" className="px-4 py-2 bg-gray-300 rounded" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
            Save
          </button>
        </div>
      </form>
    </>
  );
};

export default EditUserModal;
