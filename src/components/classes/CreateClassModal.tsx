"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

const examSchema = z.object({
  title: z.string().min(1, { message: "Kelas is required" }),
});

type ExamSchema = z.infer<typeof examSchema>;

export default function CreateClassModal() {
  const [open, setOpen] = useState(false);
  const [errorAlert, setErrorAlert] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ExamSchema>({
    resolver: zodResolver(examSchema),
  });

  const onSubmit: SubmitHandler<ExamSchema> = async (data) => {
    setIsLoading(true);
    let res = await fetch("/api/class", {
      method: "post",
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (result.status === "success") {
      setIsLoading(false);
      setOpen(false);
      router.refresh();
      reset();
    } else {
      setIsLoading(false);
      setErrorAlert(result.message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="bg-[#51459E] py-2 px-5 rounded-lg text-white">
          Create New Class
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Class</DialogTitle>
          <DialogDescription>
            Silahkan lengkapi data yang akan dimasukkan
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          {errorAlert && (
            <span className="bg-red-100 text-red-500 rounded-md py-2 w-full block text-center px-2">
              {errorAlert}
            </span>
          )}
          <div className="grid gap-4 py-4">
            <label className="block">
              <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                Title
              </span>
              <input
                type="text"
                className="mt-1 px-3 py-3 bg-white border bordr-gray-300 placeholder-slate-400 focus:outline-none block w-full rounded-md sm:text-sm"
                {...register("title")}
              />
              {errors.title && (
                <small className="text-red-500 mt-1">
                  {errors.title.message}
                </small>
              )}
            </label>
          </div>
          <button className="bg-[#51459E] py-2 px-5 w-full rounded-md text-white">
            {isLoading ? "Loading..." : "Save Data"}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
