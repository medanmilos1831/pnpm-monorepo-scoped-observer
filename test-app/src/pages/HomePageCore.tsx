import { quantumUi, type ISubscribe } from "../quantum";

enum toggleState {
  ON = "on",
  OFF = "off",
}

type toggleStateType = `${toggleState}`;

interface IToggleClient {
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
  getState: () => toggleStateType;
  subscribe: ISubscribe<toggleStateType>;
}

const toogleModule = quantumUi.createModule<`${toggleState}`, IToggleClient>({
  name: "toggle",
  onCreateEntity: ({ id, state }: { id: string; state: toggleStateType }) => {
    return {
      id,
      state,
    };
  },
  clientSchema: (store) => {
    return {
      onOpen: () => {
        store.setState(() => toggleState.ON);
      },
      onClose: () => {
        store.setState(() => toggleState.OFF);
      },
      onToggle: () => {
        store.setState((prevState) => {
          return prevState === toggleState.ON
            ? toggleState.OFF
            : toggleState.ON;
        });
      },
      getState: () => {
        return store.getState();
      },
      subscribe: store.subscribe,
    };
  },
});

toogleModule.onEntityLoad("toggleOne", (payload: IToggleClient) => {
  console.log("ONLOAD", payload);
});
toogleModule.onEntityDestroy("toggleOne", (payload: undefined) => {
  console.log("ONDESTROY", payload);
});
toogleModule.createEntity({
  id: "toggleOne",
  state: toggleState.ON,
});
const toggleOne = toogleModule.getEntityById("toggleOne");
toggleOne?.subscribe((payload) => {
  console.log("ON CHANGE", payload);
});

toggleOne?.onToggle();
toggleOne?.onToggle();
toggleOne?.onToggle();
toggleOne?.onToggle();
toggleOne?.onToggle();
toggleOne?.onToggle();

setTimeout(() => {
  toogleModule.destroyEntity("toggleOne");
}, 1000);

setTimeout(() => {
  toogleModule.createEntity({
    id: "toggleOne",
    state: toggleState.ON,
  });
}, 2000);
const HomePageCore = () => {
  return <div></div>;
};

export { HomePageCore };
