import React from "react";
import { Badge } from "@/components/ui/badge";
import { getTaskStatusClass } from "@/utils";
import { TaskStatus } from "@prisma/client";
interface BadgeStatusProps {
  status: TaskStatus;
}
const BadgeStatus = ({ status }: BadgeStatusProps) => {
  return (
    <Badge variant="outline" className={getTaskStatusClass(status as TaskStatus)}>
      {status === TaskStatus.IN_COMPLETE ? "In Complete" : "Completed"}
    </Badge>
  );
};

export default BadgeStatus;
