import React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { getTaskPriorityClass } from "@/utils";
import { TaskPriority } from "@prisma/client";

interface BadgeStatusProps {
  priority: TaskPriority;
}
const BadgePriority = ({ priority }: BadgeStatusProps) => {
  return (
    <Badge variant="outline" className={cn(getTaskPriorityClass(priority), "uppercase")}>
      {priority}
    </Badge>
  );
};

export default BadgePriority;
