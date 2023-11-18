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
import { SyntheticEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { PenSquare } from "lucide-react";

const examSchema = z.object({
  kelas: z.string().min(1, { message: "Kelas is required" }),
  url: z.string().min(1, { message: "Password is required" }),
  startTime: z.string().min(1, { message: "Start time is required" }),
  endTime: z.string().min(1, { message: "End time is required" }),
});

type ExamSchema = z.infer<typeof examSchema>;

const EditExamModal = ({ data }: any) => {
  const [kelas, setKelas] = useState(data.kelas);
  const [url, setUrl] = useState(data.url);

  const [open, setOpen] = useState(false);
  const [errorAlert, setErrorAlert] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onUpdate = async (e: SyntheticEvent) => {
    e.preventDefault();
    let res = await fetch(`/api/exam/${data.id}`, {
      method: "put",
      body: JSON.stringify(data),
    });

    const result = await res.json();
    console.log(result);
    // setOpen(false);
    // router.refresh();
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
          <DialogTitle>Edit Exams</DialogTitle>
        </DialogHeader>
        <form onSubmit={onUpdate}>
          <div className="grid gap-4 py-4">
            <label className="block">
              <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                Kelas
              </span>
              <select
                id="countries"
                className="bg-white border focus:outline-none border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                value={kelas}
                onChange={(e) => setKelas(e.target.value)}
              >
                <option hidden>Pilih kelas</option>
                <option value="ten">X (Sepuluh)</option>
                <option value="eleven">XI (Sebelas)</option>
                <option value="twelfe">XII (Dua belas)</option>
              </select>
            </label>

            <label className="block">
              <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                Url Address
              </span>
              <input
                type="text"
                className="mt-1 px-3 py-3 bg-white border bordr-gray-300 placeholder-slate-400 focus:outline-none block w-full rounded-md sm:text-sm"
                placeholder="https://daniziadulmarwan.github.io"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </label>
          </div>
          <button className="bg-[#51459E] py-2 px-5 w-full rounded-md text-white">
            Save Data
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditExamModal;
