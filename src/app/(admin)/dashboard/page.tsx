import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

async function DashboardPage() {
  const session = await getServerSession(authOptions);

  return (
    <div>
      <section className="mt-7 bg-white h-24 rounded-xl flex flex-col justify-center px-5 w-auto">
        <h5 className="text-[#51459E]">Hi,Selamat datang</h5>
        <p className="text-[#51459E] font-bold text-4xl">
          {session?.user?.name}
        </p>
      </section>
    </div>
  );
}

export default DashboardPage;
