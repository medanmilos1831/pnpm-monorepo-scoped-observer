import { useContext, useState } from "react";
import { UiReferencesClientContext } from "./UiReferencesClientProvider";

const SomeUiElement = ({ id }: { id: string }) => {
  const context = useContext(UiReferencesClientContext);
  if (!context) {
    throw new Error("UiReferencesClientContext not found");
  }
  const [state, _] = useState(() => {
    context.createEntity(id);
  });
  return <div>SomeUiElement</div>;
};

export { SomeUiElement };
