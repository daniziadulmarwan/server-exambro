import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const results = await prisma.kelas.findMany({
      include: { exam: true },
    });

    return Response.json(
      {
        status: "success",
        message: "success get kelas data",
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
      { status: 400 }
    );
  }
}
