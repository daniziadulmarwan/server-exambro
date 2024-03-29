import SignInForm from "@/components/auth/SignInForm";
import Image from "next/image";
import React from "react";
import Link from "next/link";

function Signin() {
  return (
    <div className="w-screen h-screen flex overflow-hidden">
      {/* Stage Left */}
      <div className="w-1/2 h-screen bg-white px-[120px] ">
        <h5 className="text-[30px] font-bold mt-52 text-[#034B5E]">
          Hi, Welcome Back Fellas!
        </h5>

        <SignInForm />

        <div className="text-center mt-10">
          <span>
            Don't have an account ?{" "}
            <Link href="/signup" className="text-[#F8AD15]">
              Register
            </Link>
          </span>
        </div>
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

export default Signin;
