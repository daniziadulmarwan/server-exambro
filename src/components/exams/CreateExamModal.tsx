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
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

const examSchema = z.object({
  kelas: z.string().min(1, { message: "Kelas is required" }),
  url: z.string().min(1, { message: "Url is required" }),
  startTime: z.string().min(1, { message: "Start time is required" }),
  endTime: z.string().min(1, { message: "End time is required" }),
});

type ExamSchema = z.infer<typeof examSchema>;

export default function CreateExamModal() {
  const [open, setOpen] = useState(false);
  const [errorAlert, setErrorAlert] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [classes, setClasses] = useState([]);

  const router = useRouter();

  const fetchClass = async () => {
    let res = await fetch("/api/class", { method: "get" });
    const data = await res.json();
    setClasses(data.data);
  };

  useEffect(() => {
    fetchClass();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ExamSchema>({
    resolver: zodResolver(examSchema),
  });

  const onSubmit: SubmitHandler<ExamSchema> = async (data) => {
    let res = await fetch("/api/exam", {
      method: "post",
      body: JSON.stringify(data),
    });

    const result = await res.json();
    setOpen(false);
    router.refresh();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="bg-[#51459E] py-2 px-5 rounded-lg text-white">
          Create New Exam
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Exams</DialogTitle>
          <DialogDescription>
            Silahkan lengkapi data yang akan dimasukkan
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            {/* Dificult */}
            <label className="block">
              <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                Kelas
              </span>
              <select
                {...register("kelas")}
                className="bg-white border focus:outline-none border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                onChange={(e) =>
                  setValue("kelas", e.target.value, { shouldValidate: true })
                }
              >
                <option hidden value="">
                  Choose one
                </option>
                {classes.map((item: any) => (
                  <option key={item.id} value={item.id}>
                    {item.title}
                  </option>
                ))}
              </select>
              {errors.kelas && (
                <small className="text-red-500 mt-1">
                  {errors.kelas.message}
                </small>
              )}
            </label>

            <label className="block">
              <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                Url Address
              </span>
              <input
                type="text"
                className="mt-1 px-3 py-3 bg-white border bordr-gray-300 placeholder-slate-400 focus:outline-none block w-full rounded-md sm:text-sm"
                placeholder="https://daniziadulmarwan.github.io"
                {...register("url")}
              />
              {errors.url && (
                <small className="text-red-500 mt-1">
                  {errors.url.message}
                </small>
              )}
            </label>

            <label className="block">
              <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                Start Time
              </span>
              <input
                type="datetime-local"
                className="mt-1 px-3 py-3 bg-white border bordr-gray-300 placeholder-slate-400 focus:outline-none block w-full rounded-md sm:text-sm"
                {...register("startTime")}
              />
              {errors.startTime && (
                <small className="text-red-500 mt-1">
                  {errors.startTime.message}
                </small>
              )}
            </label>

            <label className="block">
              <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                End Time
              </span>
              <input
                type="datetime-local"
                className="mt-1 px-3 py-3 bg-white border bordr-gray-300 placeholder-slate-400 focus:outline-none block w-full rounded-md sm:text-sm"
                {...register("endTime")}
              />
              {errors.endTime && (
                <small className="text-red-500 mt-1">
                  {errors.endTime.message}
                </small>
              )}
            </label>
          </div>
          <button className="bg-[#51459E] py-2 px-5 w-full rounded-md text-white">
            Save Data
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
