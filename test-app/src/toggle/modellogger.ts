const createModelLogger = (id: string, active: boolean) => {
  return {
    logAction: <T extends (...args: any[]) => any>(
      callback: T,
      value: boolean
    ): T => {
      return ((...args: Parameters<T>) => {
        callback(...args);
        if (active) {
          console.table([
            {
              name: id,
              value,
            },
          ]);
        }
      }) as T;
    },
  };
};

export { createModelLogger };
