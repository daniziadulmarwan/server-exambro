import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  let body = await request.json();
  try {
    await prisma.kelas.create({
      data: {
        title: body.title,
      },
    });

    return Response.json(
      {
        status: "success",
        message: "create kelas successfully",
      },
      { status: 201 }
    );
  } catch (error: any) {
    return Response.json(
      {
        status: "error",
        message: "Something wrong",
      },
      { status: 400 }
    );
  }
}
