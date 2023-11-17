import SignUpForm from "@/components/auth/SignUpForm";
import Image from "next/image";
import React from "react";

function Signup() {
  return (
    <div className="w-screen h-screen flex overflow-hidden">
      {/* Stage Left */}
      <div className="w-1/2 h-screen bg-white px-[120px]">
        <h5 className="text-[30px] font-bold mt-[68px] text-[#034B5E]">
          Get Started
        </h5>

        <SignUpForm />
      </div>

      {/* Stage Right */}
      <div className="w-1/2 h-screen bg-[#02566B] px-14">
        <h5 className="mt-16 font-semibold text-4xl text-white mb-32">
          Our Members are <br />
          <span className="text-[#F8AD15]"> Arround the World</span>
        </h5>
        <Image src="/bg-auth.png" width={636} height={379} alt="Auth Bg" />
      </div>
    </div>
  );
}

export default Signup;
