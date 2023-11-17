import React from "react";
import { signOut } from "next-auth/react";

const SignOutButton = () => {
  return (
    <button
      onClick={() => signOut()}
      type="button"
      className="text-[#9698AB] group-[.active]:text-[#51459E] group-[.active]:font-medium text-sm"
    >
      Logout
    </button>
  );
};

export default SignOutButton;
