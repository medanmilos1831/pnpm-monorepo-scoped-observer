import { type PropsWithChildren } from "react";
import { type IStepProps } from "../types";
import { useOnNext, useOnPrev, useOnFail, useOnFinish } from "./stepSubscibers";

const WizardStep = ({
  children,
  onNext,
  onPrev,
  onFail,
  onFinish,
}: PropsWithChildren<IStepProps>) => {
  useOnNext(onNext);
  useOnPrev(onPrev);
  useOnFail(onFail);
  useOnFinish(onFinish);

  return <>{children}</>;
};

export { WizardStep };
