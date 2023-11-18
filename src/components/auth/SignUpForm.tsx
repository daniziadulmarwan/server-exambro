"use client";
import React, { useState } from "react";
import { Eye } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

const signupSchema = z
  .object({
    fullname: z.string().min(1, { message: "Fullname is required" }),
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email({ message: "Must be valid email" }),
    password: z
      .string()
      .min(6, { message: "Password must be atleast 6 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password don't match",
  });

type SignUpSchema = z.infer<typeof signupSchema>;

const SignUpForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorAlert, setErrorAlert] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpSchema>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit: SubmitHandler<SignUpSchema> = async (data) => {
    setIsLoading(true);
    const res = await fetch("/api/auth/register", {
      method: "post",
      body: JSON.stringify(data),
    });
    const result = await res.json();
    console.log(result);

    if (result.status !== "oke") {
      setIsLoading(false);
      setErrorAlert(result.message);
    } else {
      router.push("/");
      setIsLoading(false);
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
          Fullname
        </span>
        <input
          type="text"
          className="mt-1 px-3 py-3 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none block w-full rounded-md sm:text-sm focus:ring-1"
          placeholder="Email or username"
          {...register("fullname")}
        />
        {errors.fullname && (
          <small className="text-red-500 mt-1">{errors.fullname.message}</small>
        )}
      </label>

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

      <label className="block relative">
        <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
          Confirm Password
        </span>
        <input
          type="password"
          className="mt-1 px-3 py-3 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none  block w-full rounded-md sm:text-sm focus:ring-1"
          placeholder="••••••••"
          {...register("confirmPassword")}
        />
        <button
          type="button"
          className="absolute top-[35px] right-3 cursor-pointer"
        >
          <Eye className="stroke-slate-300" />
        </button>
      </label>
      {errors.confirmPassword && (
        <small className="text-red-500 mt-1">
          {errors.confirmPassword.message}
        </small>
      )}

      <button
        type="submit"
        className="bg-[#F8AD15] w-full py-3 rounded-md text-white"
      >
        {isLoading ? "Loading..." : "Sign Up"}
      </button>
    </form>
  );
};

export default SignUpForm;
