import CreateExamModal from "@/components/exams/CreateExamModal";
import { prisma } from "@/lib/prisma";
import React from "react";
import moment from "moment";
import "moment/locale/id"; // without this line it didn't work
import EditExamModal from "@/components/exams/EditExamModal";
import DeleteDialogExam from "@/components/exams/DeleteDialogExam";

moment.locale("id");

export async function getExams() {
  let result = await prisma.exam.findMany({
    include: { kelas: true },
  });
  return result;
}

async function ExamsPage() {
  const datas = await getExams();

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
                Mapel
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
            {datas.map((item, i) => (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                key={item.id}
              >
                <th
                  scope="row"
                  className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {i + 1}
                </th>
                <td className="px-10 py-4">{item.kelas?.title}</td>
                <td className="px-10 py-4">{item.mapel}</td>
                <td className="px-10 py-4">
                  {moment(item.start_time).format("dddd").toString()}
                </td>
                <td className="px-10 py-4">
                  {item.end_time.getHours() - item.start_time.getHours()} Jam
                </td>
                <td className="px-6 py-4 flex gap-1">
                  {/* <EditExamModal data={item} /> */}
                  <DeleteDialogExam id={item.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default ExamsPage;
