const useCreateEntity = () => {
  const context = useContext(WizardClientContext);
  if (!context) {
    throw new Error("WizardClientContext not found");
  }
  return context;
};
