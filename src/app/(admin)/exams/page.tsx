import CreateExamModal from "@/components/exams/CreateExamModal";
import { PenSquare, X } from "lucide-react";
import React from "react";

function ExamsPage() {
  return (
    <section className="mt-7 rounded-xl flex flex-col justify-center px-5 w-auto">
      <div>
        <CreateExamModal />
      </div>

      <div className="relative overflow-x-auto mt-5">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr className="bg-[#F2F0FF]">
              <th scope="col" className="px-4 py-3">
                No
              </th>
              <th scope="col" className="px-10 py-3">
                Kelas
              </th>
              <th scope="col" className="px-10 py-3">
                Hari
              </th>
              <th scope="col" className="px-10 py-3">
                Waktu
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                1
              </th>
              <td className="px-10 py-4">Eleven</td>
              <td className="px-10 py-4">Monday</td>
              <td className="px-10 py-4">07:00 - 10:00</td>
              <td className="px-6 py-4 flex gap-1">
                <button className="bg-yellow-100 rounded-md py-2 px-2 border border-yellow-200">
                  <PenSquare size={14} className="stroke-yellow-500" />
                </button>
                <button className="bg-red-100 rounded-md py-2 px-2 border border-red-200">
                  <X size={14} className="stroke-red-500" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default ExamsPage;
