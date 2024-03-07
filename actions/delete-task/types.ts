import { z } from "zod";
import { Task } from "@prisma/client";

import { DeleteTask } from "./schema";
import { ActionState } from "@/hooks/useAction";

export type InputType = z.infer<typeof DeleteTask>;
export type ReturnType = ActionState<InputType, Task>;
