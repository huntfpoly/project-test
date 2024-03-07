"use server";

import { db } from "@/lib/db";
import { TaskStatus } from "@prisma/client";

export async function getTasks({
  status,
  offset = 0,
  limit = 10,
}: {
  status?: TaskStatus | undefined;
  offset?: number;
  limit?: number;
}) {
  const data = await db.task.findMany({
    where: { status: status },
    skip: offset,
    take: limit,
    orderBy: { updatedAt: "desc" },
  });

  const totalCount = await db.task.count({
    where: { status: status },
  });
  const totalPages = Math.ceil(totalCount / limit);

  return { data, totalCount, totalPages };
}
