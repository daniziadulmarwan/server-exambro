import { Bell, MessagesSquare, User2 } from "lucide-react";
import Image from "next/image";
import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const Profile = async () => {
  const session = await getServerSession(authOptions);

  return (
    <section className="w-[290px] h-screen fixed bg-white right-0">
      <div className="absolute">
        <svg
          width="351"
          height="250"
          viewBox="0 0 351 250"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            opacity="0.3"
            d="M309.292 -257.197C455.178 -233.558 554.278 -96.1305 530.638 49.7551C506.999 195.641 389.282 364.123 254.087 140.996C118.892 -82.1301 -20.6395 71.3857 3 -74.5C26.6394 -220.386 163.406 -280.837 309.292 -257.197Z"
            fill="#D8D2FF"
          />
        </svg>
      </div>

      <div className="px-7 mt-7 flex flex-col justify-between h-full">
        <div>
          <div className="flex justify-between items-center">
            <div className="bg-white shadow-lg w-8 h-8 rounded-lg grid place-items-center border">
              <MessagesSquare size={20} />
            </div>
            <div className="flex gap-2">
              <div className="bg-white shadow-lg w-8 h-8 rounded-lg grid place-items-center border z-10">
                <Bell size={20} />
              </div>
              <div className="bg-white shadow-lg w-8 h-8 rounded-lg grid place-items-center border z-10">
                <User2 size={20} />
              </div>
            </div>
          </div>

          <div className="mt-11 flex justify-center">
            <div className="flex flex-col justify-center items-center relative">
              <div className="border-[5px] border-[#51459E] rounded-full p-1 ">
                <div className="w-16 h-16 rounded-full bg-[#EB8133] overflow-hidden">
                  <Image
                    src="/user.png"
                    width={64}
                    height={64}
                    alt="Dani Profile"
                  />
                </div>
              </div>

              <h5 className="text-[#505887] text-base font-semibold mt-2">
                {session?.user?.name}
              </h5>
              <p className="text-[#9698AB] text-sm">Programmer</p>
            </div>
          </div>

          <div className="mt-9 flex justify-between">
            <div className="text-center">
              <h6 className="text-[#505887] font-semibold text-base">457</h6>
              <p className="text-[#9698AB] text-sm">Projects</p>
            </div>
            <div className="text-center">
              <h6 className="text-[#505887] font-semibold text-base">450</h6>
              <p className="text-[#9698AB] text-sm">Completed</p>
            </div>
            <div className="text-center">
              <h6 className="text-[#505887] font-semibold text-base">12</h6>
              <p className="text-[#9698AB] text-sm">Awards</p>
            </div>
          </div>
        </div>
        <div className="w-full bg-[#51459E] rounded-t-[30px] h-[472px]"></div>
      </div>
    </section>
  );
};

export default Profile;
