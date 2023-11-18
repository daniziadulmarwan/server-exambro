import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";

export async function GET() {
  return Response.json("Hello World");
}

export async function POST(request: Request) {
  let body = await request.json();
  try {
    let user = await prisma.user.findUnique({
      where: { email: body.email },
    });

    if (user) {
      return Response.json(
        {
          status: "error",
          message: "user registered",
        },
        { status: 400 }
      );
    }

    await prisma.user.create({
      data: {
        fullname: body.fullname,
        email: body.email,
        password: await hash(body.password, 10),
      },
    });

    return Response.json(
      {
        status: "oke",
        message: "create account successfully",
      },
      { status: 201 }
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
