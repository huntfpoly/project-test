import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function GET(req: Request, { params }: { params: { taskId: string } }) {
  try {
    const card = await db.task.findUnique({
      where: {
        id: params.taskId,
      },
    });

    return NextResponse.json(card);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
