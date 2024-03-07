import { useState, useCallback } from "react";

// Define the ActionState type, which can either contain data or an error
export type ActionState<TInput, TOutput> = {
  data?: TOutput;
  error?: string;
};

// Define the Action type, which is a function that takes data and returns a Promise of ActionState
type Action<TInput, TOutput> = (data: TInput) => Promise<ActionState<TInput, TOutput>>;

// Define the options for useAction
interface UseActionOptions<TOutput> {
  onSuccess?: (data: TOutput) => void;
  onError?: (error: string) => void;
  onComplete?: () => void;
}

export const useAction = <TInput, TOutput>(
  action: Action<TInput, TOutput>,
  options: UseActionOptions<TOutput> = {},
) => {
  // Define state for data and loading status
  const [data, setData] = useState<TOutput | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Define the execute function
  const execute = useCallback(
    async (input: TInput) => {
      setIsLoading(true);
      try {
        const result = await action(input);
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

  // Return the execute function and the state
  return {
    execute,
    data,
    isLoading,
  };
};
