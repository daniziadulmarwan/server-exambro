import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    let datas = await prisma.kelas.findMany();
    return Response.json(
      {
        status: "success",
        message: "success fetch all kelas data",
        data: datas,
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      {
        status: "error",
        message: "error occured",
      },
      { status: 400 }
    );
  }
}

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
