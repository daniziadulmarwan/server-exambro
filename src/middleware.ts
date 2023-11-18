import { NextResponse } from "next/server";
import withAuth from "./middlewares/withAuth";

export async function mainMiddleware(request: Request) {
  const res = NextResponse.next();
  return res;
}

export default withAuth(mainMiddleware, ["/dashboard", "/exams", "/kelas"]);
