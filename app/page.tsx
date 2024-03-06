import TaskList from "@/components/TaskList";
import { db } from "@/lib/db";

interface BoardIdPageProps {
  params: {
    boardId: string;
  };
}
export default async function TaskPage() {
  const lists = await db.task.findMany({
    where: {},
    orderBy: {
      updatedAt: "desc",
    },
  });
  return (
    <main className="mx-auto min-h-screen ">
      <h1 className="pb-10 pt-6 text-center text-2xl font-black tracking-wide sm:pb-14 sm:text-4xl">
        Welcome to Task Manager
      </h1>
      <div className="grid place-items-center">
        <TaskList data={lists} />
      </div>
    </main>
  );
}
