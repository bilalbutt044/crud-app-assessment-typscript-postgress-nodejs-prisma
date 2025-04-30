// src/pages/Login.tsx
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axios";
import useLocalStorage from "../hooks/useLocalStorage";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginForm = z.infer<typeof loginSchema>;

const Login = () => {
  const navigate = useNavigate();
  const { setValue } = useLocalStorage("token", "");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      const response = await axiosInstance.post("/auth/login", data);
      const token = response.data.token;

      if (token) {
        setValue(token);
        navigate("/dashboard");
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        alert(err.response.data.message);
      } else {
        alert("Login failed");
      }
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-800">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow-md w-80">
        <h2 className="text-2xl font-bold mb-4 text-center ">Login</h2>

        <input {...register("email")} type="email" placeholder="Email" className="w-full p-2 mb-2 border rounded" />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

        <input {...register("password")} type="password" placeholder="Password" className="w-full p-2 mb-2 border rounded" />
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

        <button type="submit" disabled={isSubmitting} className=" cursor-pointer w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
