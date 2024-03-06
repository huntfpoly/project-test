import React from "react";
import { FilterState, ITask } from "@/app/types";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const TaskItem = ({ item }: { item: ITask }) => {
  const [open, setOpen] = React.useState(false);

  const getTaskStatusClass = (status: FilterState) => {
    if (status === FilterState.IN_COMPLETE) {
      return "text-warning-foreground bg-warning-background";
    }
    return "bg-green-100 text-green-600";
  };
  return (
    <>
      <div className="flex flex-col  rounded-lg bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <Badge variant="outline" className={getTaskStatusClass(item.status)}>
            {item.status === FilterState.IN_COMPLETE ? "In Complete" : "Completed"}
          </Badge>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-2xl">
              <div>ok</div>
            </DialogContent>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full focus:outline-none">
                  <DotsVerticalIcon />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setOpen(true)}>Edit</DropdownMenuItem>
                <DropdownMenuItem> Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </Dialog>
        </div>
        <div>
          <h3 className="text-lg font-semibold">{item.title}</h3>
          <p className="line-clamp-3 overflow-hidden overflow-ellipsis text-slate-500">{item.description}</p>
        </div>
      </div>
    </>
  );
};

export default TaskItem;
