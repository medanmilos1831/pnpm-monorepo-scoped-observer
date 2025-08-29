import { createWizzard } from "react-wizzard";

const { useWizzard, WizzardHandler, useWatch } = createWizzard({
  keys: ["wizzardOne", "wizzardTwo"],
});

export { useWizzard, WizzardHandler, useWatch };
