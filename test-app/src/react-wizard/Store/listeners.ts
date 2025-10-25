export function listeners(
  subscribe: (
    eventName: "onReset" | "onFinish" | "onStepChange",
    callback: (data: any) => void
  ) => () => void
) {
  return (
    eventName: "onReset" | "onFinish" | "onStepChange",
    callback: (data: any) => void
  ) => {
    return subscribe(eventName, callback);
  };
}
