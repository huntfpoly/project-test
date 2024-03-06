import { useState, useCallback } from "react";
import { Task } from "@prisma/client";

export type ActionState<TOutput> = {
  data?: TOutput;
  error?: string;
};
type Action<TOutput> = (data: TOutput) => Promise<ActionState<TOutput>>;

interface UseActionOptions<TOutput> {
  onSuccess?: (data: TOutput) => void;
  onError?: (error: string) => void;
  onComplete?: () => void;
}

export const useAction = <TOutput>(action: any, options: UseActionOptions<TOutput> = {}) => {
  const [data, setData] = useState<TOutput | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const execute = useCallback(
    async (input: TOutput) => {
      setIsLoading(true);
      try {
        const result = await action(input);
        console.log("%c result", "color: red", result);
        if (!result) {
          return;
        }
        if (result.error) {
          options.onError?.(result.error);
        }

        if (result.data) {
          setData(result.data);
          options.onSuccess?.(result.data);
        }
      } finally {
        setIsLoading(false);
        options.onComplete?.();
      }
    },
    [action, options],
  );

  return {
    execute,
    data,
    isLoading,
  };
};
