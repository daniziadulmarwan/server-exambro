import { prisma } from "@/lib/prisma";

export async function PUT(request: Request, id: any) {
  let body = await request.json();

  try {
    // await prisma.exam.update({
    //   where: { id: id.params.id },
    //   data: {
    //     kelas: body.kelas,
    //     url: body.url,
    //   },
    // });

    return Response.json(
      { status: "success", message: "exam data updated" },
      { status: 200 }
    );
  } catch (error: any) {
    return Response.json(
      { status: "error", message: error.message },
      { status: 400 }
    );
  }
}
