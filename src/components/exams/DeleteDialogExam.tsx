"use client";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { AlertCircle, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteDialogExam(props: any) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const onDelete = async () => {
    let response = await fetch(`/api/exam/${props.id}`, {
      method: "delete",
    });

    const res = await response.json();

    if (res.status === "success") {
      setOpen(false);
      router.refresh();
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <button className="bg-red-100 rounded-md py-2 px-2 border border-red-200">
          <X size={14} className="stroke-red-500" />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="w-full flex flex-col justify-center items-center">
            <div className="w-20 h-20 rounded-full grid place-items-center bg-red-100">
              <AlertCircle size={50} className="stroke-red-500" />
            </div>
            <h5 className="mt-3 font-semibold text-lg text-slate-900">
              Are you absolutely sure?
            </h5>
            <p className="text-slate-400 text-sm">
              Want to delete this data permanently ?
            </p>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <div className="w-full flex justify-center gap-3 mt-4">
            <AlertDialogCancel className="bg-red-100 text-red-500 border-none hover:bg-red-200 hover:text-red-600">
              Cancel
            </AlertDialogCancel>
            <button
              onClick={onDelete}
              className="bg-teal-100 px-3 rounded-md text-teal-500 border-none hover:bg-teal-200 hover:text-teal-600"
            >
              Yes, delete it
            </button>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
