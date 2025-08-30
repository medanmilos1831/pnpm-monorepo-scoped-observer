import { createVisibility } from "../react-visibility-state";

const {
  useVisibility: useModal,
  VisibilityHandler: ModalHandler,
  getItem: getModal,
  useWatch: useModalWatch,
} = createVisibility({
  keys: [
    "user",
    "city",
    "company",
    "product",
    "order",
    "payment",
    "login",
    "confirm",
    "settings",
    "profile",
    "notification",
    "help",
  ] as const,
});

const {
  useVisibility: useTooltip,
  VisibilityHandler: TooltipHandler,
  getItem: getTooltip,
  useWatch: useTooltipWatch,
} = createVisibility({
  keys: [
    "user",
    "city",
    "company",
    "product",
    "order",
    "payment",
    "login",
    "confirm",
    "settings",
    "profile",
    "notification",
    "help",
  ] as const,
});

const {
  useVisibility: useDrawer,
  VisibilityHandler: DrawerHandler,
  getItem: getDrawer,
  useWatch: useDrawerWatch,
} = createVisibility({
  keys: [
    "user",
    "city",
    "company",
    "product",
    "order",
    "payment",
    "login",
    "confirm",
    "settings",
    "profile",
    "notification",
    "help",
  ] as const,
});

const {
  useVisibility: useAccordion,
  VisibilityHandler: AccordionHandler,
  getItem: getAccordion,
  useWatch: useAccordionWatch,
} = createVisibility({
  keys: [
    "user",
    "city",
    "company",
    "product",
    "order",
    "payment",
    "login",
    "confirm",
    "settings",
    "profile",
    "notification",
    "help",
  ] as const,
});

export {
  useModal,
  ModalHandler,
  getModal,
  useModalWatch,
  useTooltip,
  TooltipHandler,
  getTooltip,
  useTooltipWatch,
  useDrawer,
  DrawerHandler,
  getDrawer,
  useDrawerWatch,
  useAccordion,
  AccordionHandler,
  getAccordion,
  useAccordionWatch,
};
