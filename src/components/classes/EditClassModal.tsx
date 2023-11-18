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
import { classSchema } from "@/schemas/classSchema";
import { PenSquare } from "lucide-react";

type ClassSchema = z.infer<typeof classSchema>;

export default function EditClassModal({ kelas }: any) {
  const [open, setOpen] = useState(false);
  const [errorAlert, setErrorAlert] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const {
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    register,
  } = useForm<ClassSchema>({
    resolver: zodResolver(classSchema),
  });

  useEffect(() => {
    reset({
      title: kelas.title,
    });
  }, [kelas]);

  const onSubmit: SubmitHandler<ClassSchema> = async (data) => {
    setIsLoading(true);
    let res = await fetch(`/api/class/${kelas.id}`, {
      method: "put",
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
        <button className="bg-yellow-100 rounded-md py-2 px-2 border border-yellow-200">
          <PenSquare size={14} className="stroke-yellow-500" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Class {kelas.title}</DialogTitle>
          <DialogDescription>
            Silahkan perbaiki data yang akan diubah
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
                className="mt-1 px-3 py-3 bg-white border border-gray-300 placeholder-slate-400 focus:outline-none block w-full rounded-md sm:text-sm"
                {...register("title")}
                onChange={(e) =>
                  setValue("title", e.target.value, { shouldValidate: false })
                }
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
