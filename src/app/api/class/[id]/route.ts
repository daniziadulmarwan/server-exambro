import { prisma } from "@/lib/prisma";

export async function DELETE(request: Request) {
  let id = request.url.split("http://localhost:3000/api/class/")[1];
  try {
    await prisma.kelas.delete({
      where: { id: +id },
    });

    return Response.json(
      { status: "success", message: "successfully delete data" },
      { status: 200 }
    );
  } catch (error: any) {
    return Response.json(
      { status: "error", message: error.message },
      { status: 400 }
    );
  }
}

export async function PUT(request: Request) {
  let id = request.url.split("http://localhost:3000/api/class/")[1];
  let body = await request.json();

  try {
    await prisma.kelas.update({
      where: { id: +id },
      data: {
        title: body.title,
      },
    });

    return Response.json(
      { status: "success", message: "success update data" },
      { status: 200 }
    );
  } catch (error: any) {
    return Response.json(
      { status: "error", message: error.message },
      { status: 400 }
    );
  }
}
