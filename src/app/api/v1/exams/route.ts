import { prisma } from "@/libs/prisma";

export async function GET() {
  try {
    const results = await prisma.exam.findMany();
    return Response.json(
      {
        status: "success",
        message: "success get exams data",
        data: results,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return Response.json(
      {
        status: "error",
        message: error.message,
      },
      { status: 200 }
    );
  }
}
