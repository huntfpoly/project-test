"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format, setDefaultOptions } from "date-fns";
import { useAction } from "@/hooks/useAction";
import { createTask } from "@/actions/create-task";
import { CreateTaskSchema } from "@/actions/create-task/schema";
import { useCardModal } from "@/hooks/useCardModal";
import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/lib/fetcher";
import { Task, TaskPriority, TaskStatus } from "@prisma/client";
import React, { useEffect } from "react";
import { updateTask } from "@/actions/edit-task";
import { vi } from "date-fns/locale";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

setDefaultOptions({ locale: vi });

export function TaskModal() {
  const isOpen = useCardModal((state) => state.isOpen);
  const { onOpen, id, onClose } = useCardModal((state) => state);

  const { data: taskData, isLoading: loading } = useQuery<Task>({
    queryKey: ["task", id],
    queryFn: () => fetcher(`/api/tasks/${id}`),
    enabled: !!id,
  });

  // 1. Define your form.
  const form = useForm<z.infer<typeof CreateTaskSchema>>({
    resolver: zodResolver(CreateTaskSchema),
    defaultValues: {
      title: "",
      description: "",
      status: TaskStatus.IN_COMPLETE,
      dueDate: undefined,
      priority: undefined,
    },
  });

  useEffect(() => {
    if (taskData) {
      form.setValue("title", taskData.title);
      form.setValue("description", taskData.description || "");
      form.setValue("status", taskData.status as TaskStatus);
      taskData.dueDate && form.setValue("dueDate", taskData.dueDate);
      taskData.priority && form.setValue("priority", taskData.priority);
    }
  }, [taskData, form]);
  // @ts-ignore
  const { execute, isLoading } = useAction(id ? updateTask : createTask, {
    onSuccess: () => {
      form.reset();
      onClose();
      toast.success(id ? `Task ${id} updated!` : `Task created!`);
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof CreateTaskSchema>) {
    // This will be type-safe and validated.
    const data = id && taskData ? { ...values, id: taskData.id } : values;
    // @ts-ignore
    execute(data);
  }
  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        onClose();
        form.reset();
      }}
    >
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl">{id ? `Edit` : `Add`} Task</DialogTitle>
          <DialogDescription>Add a new Task to your Task Manager here. Click save when you are done.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            {/* Row Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Title" disabled={loading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Row Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={loading}
                      rows={3}
                      placeholder="Description"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Row Date */}
            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date of birth</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          disabled={loading}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value ? format(field.value, "dd/MM/yyyy") : <span>Pick a date</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Row Status */}
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select disabled={loading} onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Task Status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={TaskStatus.IN_COMPLETE}>
                        <Badge variant="outline" className="bg-orange-100 text-orange-600">
                          In Complete
                        </Badge>
                      </SelectItem>
                      <SelectItem value={TaskStatus.COMPLETED}>
                        <Badge variant="outline" className="bg-green-100 text-green-600">
                          Completed
                        </Badge>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Row Priority */}
            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Priority {field.value}</FormLabel>
                  <Select disabled={loading} onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="col-span-3">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {/*@ts-ignore*/}
                      <SelectItem value={undefined}>None</SelectItem>
                      <SelectItem value={TaskPriority.LOW}>
                        <Badge variant="outline" className="bg-green-100 text-green-600">
                          {TaskPriority.LOW}
                        </Badge>
                      </SelectItem>
                      <SelectItem value={TaskPriority.MEDIUM}>
                        <Badge variant="outline" className="bg-yellow-100 text-yellow-600">
                          {TaskPriority.MEDIUM}
                        </Badge>
                      </SelectItem>
                      <SelectItem value={TaskPriority.HIGH}>
                        <Badge variant="outline" className="bg-red-100 text-red-600">
                          {TaskPriority.HIGH}
                        </Badge>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="!mt-5 flex justify-center">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </>
                ) : (
                  "Submit"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
