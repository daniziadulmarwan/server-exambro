"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Eye } from "lucide-react";

const signinSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Must be valid email" }),
  password: z
    .string()
    .min(6, { message: "Password must be atleast 6 characters" }),
});

type SignInSchema = z.infer<typeof signinSchema>;

const SignInForm = () => {
  const [errorAlert, setErrorAlert] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInSchema>({
    resolver: zodResolver(signinSchema),
  });

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  const onSubmit: SubmitHandler<SignInSchema> = async (data) => {
    setIsLoading(true);
    const response = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (response?.ok) {
      setIsLoading(false);
      router.push(callbackUrl);
    } else {
      setIsLoading(false);
      setErrorAlert("Something wrong");
    }
  };

  return (
    <form className="mt-6 space-y-8" onSubmit={handleSubmit(onSubmit)}>
      {/* START: Alert */}
      {errorAlert && (
        <span className="text-center inline-block w-full rounded-md py-2 bg-red-100 text-red-500">
          {errorAlert}
        </span>
      )}
      {/* END: Alert */}

      <label className="block">
        <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
          Email Address
        </span>
        <input
          type="email"
          className="mt-1 px-3 py-3 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none  block w-full rounded-md sm:text-sm focus:ring-1"
          placeholder="you@example.com"
          {...register("email")}
        />
        {errors.email && (
          <small className="text-red-500 mt-1">{errors.email.message}</small>
        )}
      </label>

      <label className="block relative">
        <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
          Password
        </span>
        <input
          type="password"
          className="mt-1 px-3 py-3 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none  block w-full rounded-md sm:text-sm focus:ring-1"
          placeholder="••••••••"
          {...register("password")}
        />
        <button
          type="button"
          className="absolute top-[35px] right-3 cursor-pointer"
        >
          <Eye className="stroke-slate-300" />
        </button>
      </label>
      {errors.password && (
        <small className="text-red-500 mt-1">{errors.password.message}</small>
      )}

      <button
        type="submit"
        className="bg-[#F8AD15] w-full py-3 rounded-md text-white"
      >
        {isLoading ? "Loading..." : "Sign In"}
      </button>
    </form>
  );
};

export default SignInForm;
