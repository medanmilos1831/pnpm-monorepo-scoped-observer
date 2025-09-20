class CommandCenter {
  private nextStep = (currentIndex: number, visibleSteps: string[]) => {
    if (currentIndex === -1 || currentIndex === visibleSteps.length - 1) {
      return null;
    }

    const nextStepName = visibleSteps[currentIndex + 1];
    return nextStepName;
  };

  private prevStep = (currentIndex: number, visibleSteps: string[]) => {
    if (currentIndex === -1 || currentIndex === 0) {
      return null;
    }

    const prevStepName = visibleSteps[currentIndex - 1];
    return prevStepName;
  };

  navigator = (
    command: "next" | "prev",
    {
      visibleSteps,
      currentIndex,
    }: { visibleSteps: string[]; currentIndex: number }
  ) => {
    let stepName: string | null;
    if (command === "next") {
      stepName = this.nextStep(currentIndex, visibleSteps);
    } else {
      stepName = this.prevStep(currentIndex, visibleSteps);
    }
    if (stepName === null) {
      return;
    }
    return {
      command,
      stepName,
    };
  };
}

export { CommandCenter };
