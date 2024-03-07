import TaskList from "@/app/_components/TaskList";
import Header from "@/app/_components/Header";

import { getTasks } from "@/actions/get-task";
import { TaskStatus } from "@prisma/client";

interface TaskFilterPageProps {
  searchParams: {
    status: TaskStatus | "all" | undefined;
    page: number;
    pageSize: number;
  };
}
export default async function TaskPage(context: TaskFilterPageProps) {
  const { status = "all", page = 1, pageSize = 10 } = context.searchParams;
  const skip = pageSize * (page - 1);
  const { data, totalPages, totalCount } = await getTasks({
    status: status && status !== "all" ? status : undefined,
    offset: skip,
    limit: pageSize,
  });
  return (
    <main className="mx-auto min-h-screen ">
      <h1 className="pb-10 pt-6 text-center text-2xl font-black tracking-wide sm:pb-14 sm:text-4xl">
        Welcome to Task Manager
      </h1>
      <Header />
      <TaskList data={data} totalPages={totalPages} totalCount={totalCount} />
    </main>
  );
}
