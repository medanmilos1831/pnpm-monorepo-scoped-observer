import { useContext } from "react";

export const useRequiredContext = <T>(
  context: React.Context<T | undefined>
): T => {
  const value = useContext(context);
  if (!value) {
    throw new Error(
      `Context not found. Make sure to use this hook within the correct provider.`
    );
  }
  return value;
};
