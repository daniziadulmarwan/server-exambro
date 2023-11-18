import CreateClassModal from "@/components/classes/CreateClassModal";
import DeleteDialog from "@/components/classes/DeleteDialog";
import { prisma } from "@/lib/prisma";
import { X } from "lucide-react";
import React from "react";

export async function getClass() {
  let classes = await prisma.kelas.findMany();
  return classes;
}

async function ClassesPage() {
  const datas = await getClass();
  return (
    <section className="mt-7 rounded-xl flex flex-col justify-center px-5 w-auto">
      <div>
        <CreateClassModal />
      </div>

      <div className="relative overflow-x-auto mt-5">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr className="bg-[#F2F0FF]">
              <th scope="col" className="px-4 py-3">
                No
              </th>
              <th scope="col" className="px-10 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {datas.map((item, i) => (
              <tr
                key={item.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {i + 1}
                </th>
                <td className="px-10 py-4">{item.title}</td>
                <td className="px-6 py-4 flex gap-1">
                  <DeleteDialog id={item.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default ClassesPage;
