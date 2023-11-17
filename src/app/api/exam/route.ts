import { prisma } from "@/libs/prisma";

export async function POST(request: Request) {
  let body = await request.json();

  try {
    await prisma.exam.create({
      data: {
        kelas: body.kelas,
        url: body.url,
      },
    });

    return Response.json(
      { status: "success", message: "exam data created" },
      { status: 201 }
    );
  } catch (error) {
    return Response.json(
      { status: "error", message: "error occured" },
      { status: 400 }
    );
  }
}
