import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  let id = request.url.split("http://localhost:3000/api/v1/exams/")[1];

  try {
    const result = await prisma.exam.findUnique({
      where: { id: +id },
      include: { Kelas: true },
    });

    return Response.json(
      {
        status: "success",
        message: "success get exams data by id",
        data: result,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return Response.json(
      {
        status: "error",
        message: error.message,
      },
      { status: 400 }
    );
  }
}
