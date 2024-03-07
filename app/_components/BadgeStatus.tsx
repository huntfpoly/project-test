import React from "react";
import { Badge } from "@/components/ui/badge";
import { TaskStatus } from "@prisma/client";
interface BadgeStatusProps {
  status: TaskStatus;
}
const BadgeStatus = ({ status }: BadgeStatusProps) => {
  if (status === TaskStatus.IN_COMPLETE)
    return (
      <Badge variant="outline" className="bg-yellow-100 text-yellow-500">
        In Complete
      </Badge>
    );
  return (
    <Badge variant="outline" className="bg-green-100 text-green-600">
      Completed
    </Badge>
  );
};

export default BadgeStatus;
