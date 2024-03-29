"use client";
import "react-datetime/css/react-datetime.css";
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
import { examSchema } from "@/schemas/examSchema";
import Datetime from "react-datetime";
import { PenSquare } from "lucide-react";

type ExamSchema = z.infer<typeof examSchema>;

export default function CreateExamModal(props: any) {
  console.log(props.data);
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

  useEffect(() => {
    reset({
      kelas: props.data.kelas.title,
      mapel: props.data.mapel,
      url: props.data.url,
    });
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    getValues,
  } = useForm<ExamSchema>({
    resolver: zodResolver(examSchema),
  });

  const onSubmit: SubmitHandler<ExamSchema> = async (data) => {
    let res = await fetch("/api/exam", {
      method: "post",
      body: JSON.stringify(data),
    });

    const result = await res.json();
    if (result.status === "success") {
      setOpen(false);
      router.refresh();
      reset();
    } else {
      reset();
      setOpen(false);
      setErrorAlert(result.message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="bg-yellow-100 rounded-md py-2 px-2 border border-yellow-200">
          <PenSquare size={14} className="stroke-yellow-500" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] -mt-20">
        <DialogHeader>
          <DialogTitle>Create New Exams</DialogTitle>
          <DialogDescription>
            Silahkan lengkapi data yang akan dimasukkan
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Alert */}
          {errorAlert && (
            <div className="bg-red-100 text-red-500 rounded-md py-2 w-full text-center">
              {errorAlert}
            </div>
          )}

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
                  <option
                    defaultValue={getValues("kelas")}
                    key={item.id}
                    value={item.id}
                  >
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

            {/* Mapel */}
            <label className="block">
              <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                Mata Pelajaran
              </span>
              <input
                type="text"
                className="mt-1 px-3 py-3 bg-white border bordr-gray-300 placeholder-slate-400 focus:outline-none block w-full rounded-md sm:text-sm"
                {...register("mapel")}
              />
              {errors.mapel && (
                <small className="text-red-500 mt-1">
                  {errors.mapel.message}
                </small>
              )}
            </label>

            {/* Url */}
            <label className="block">
              <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                Url Address
              </span>
              <input
                type="text"
                className="mt-1 px-3 py-3 bg-white border bordr-gray-300 placeholder-slate-400 focus:outline-none block w-full rounded-md sm:text-sm"
                {...register("url")}
              />
              {errors.url && (
                <small className="text-red-500 mt-1">
                  {errors.url.message}
                </small>
              )}
            </label>

            {/* Start Time */}
            <label className="block">
              <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                Start Time
              </span>
              <Datetime
                className="focus:outline-none border border-slate-100 py-2 px-2 focus:border-none mt-1 rounded-md"
                {...register("startTime")}
                onChange={(e) =>
                  setValue("startTime", e.toString(), {
                    shouldValidate: true,
                  })
                }
              />
              {errors.startTime && (
                <small className="text-red-500 mt-1">
                  {errors.startTime.message}
                </small>
              )}
            </label>

            {/* End Time */}
            <label className="block">
              <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                End Time
              </span>
              <Datetime
                className="focus:outline-none border border-slate-100 py-2 px-2 focus:border-none rounded-md mt-1"
                onChange={(e) =>
                  setValue("endTime", e.toString(), {
                    shouldValidate: true,
                  })
                }
              />
              {errors.endTime && (
                <small className="text-red-500 mt-1">
                  {errors.endTime.message}
                </small>
              )}
            </label>
          </div>
          <button
            type="submit"
            className="bg-[#51459E] py-2 px-5 w-full rounded-md text-white"
          >
            Save Data
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
