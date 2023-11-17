import { prisma } from "@/libs/prisma";

export async function POST(request: Request) {
  let body = await request.json();

  try {
    await prisma.exam.create({
      data: {
        kelas: body.kelas,
        url: body.url,
        start_time: new Date(body.startTime),
        end_time: new Date(body.endTime),
      },
    });

    return Response.json(
      { status: "success", message: "exam data created" },
      { status: 201 }
    );
  } catch (error: any) {
    return Response.json(
      { status: "error", message: error.message },
      { status: 400 }
    );
  }
}
