import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  let body = await request.json();

  try {
    await prisma.exam.create({
      data: {
        kelas_id: +body.kelas,
        mapel: body.mapel,
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
