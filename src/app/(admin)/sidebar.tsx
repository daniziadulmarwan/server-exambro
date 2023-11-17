"use client";
import Image from "next/image";
import React from "react";
import { GaugeCircle, LibraryBig, Users2, Lock } from "lucide-react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import SignOutButton from "@/components/admin/SignOutButton";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-[204px] h-screen fixed border-r border-[#FAFAFA] px-7  flex flex-col justify-between bg-white">
      <div>
        <div className="flex w-full mt-12 gap-3">
          <Image
            src="/logo.png"
            width={26}
            height={26}
            alt="Logo"
            style={{ minHeight: 26, minWidth: 26 }}
          />
          <h5 className="text-lg text-[#51459E] font-bold">ExamBro</h5>
        </div>

        <ul className="mt-16 space-y-9">
          <li
            className={`flex items-center gap-3 menu-links group ${
              pathname === "/dashboard" ? "active" : ""
            }`}
          >
            <GaugeCircle
              size={20}
              className="stroke-[#9698AB] group-[.active]:stroke-[#51459E]"
            />
            <Link
              href="/dashboard"
              className="text-[#9698AB] group-[.active]:text-[#51459E] group-[.active]:font-medium text-sm"
            >
              Dashboard
            </Link>
          </li>
          <li
            className={`flex items-center gap-3 menu-links group ${
              pathname === "/classes" ? "active" : ""
            }`}
          >
            <Users2
              size={20}
              className="stroke-[#9698AB] group-[.active]:stroke-[#51459E]"
            />
            <Link
              href="/classes"
              className="text-[#9698AB] group-[.active]:text-[#51459E] group-[.active]:font-medium text-sm"
            >
              Class
            </Link>
          </li>
          <li
            className={`flex items-center gap-3 menu-links group ${
              pathname === "/exams" ? "active" : ""
            }`}
          >
            <LibraryBig
              size={20}
              className="stroke-[#9698AB] group-[.active]:stroke-[#51459E]"
            />
            <Link
              href="/exams"
              className="text-[#9698AB] group-[.active]:text-[#51459E] group-[.active]:font-medium text-sm"
            >
              Exams
            </Link>
          </li>
          <li className="flex items-center gap-3 menu-links">
            <Lock
              size={20}
              className="stroke-[#9698AB] group-[.active]:stroke-[#51459E]"
            />
            <SignOutButton />
          </li>
        </ul>
      </div>

      {/* Avatar */}
      <div className="mb-12 relative">
        <div className="w-[157px] h-[185px] bg-[#ECFDFF] rounded-xl"></div>
        <Image
          src="/richie.png"
          width={157}
          height={211}
          alt="Avatar"
          className="absolute -top-8"
        />
        <div className="absolute -bottom-2 right-0 left-3 bg-white px-4 py-3 rounded-full shadow-xl text-sm grid place-items-center">
          Let's Talk 😁
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
