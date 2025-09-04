import React, { useState } from "react";
import { createMachine } from "@scoped-observer/react-state-machine";
import { createMachineV2 } from "../../react-state-machine/indexV2";
const { useMachine } = createMachine({
  init: "open",
  transition: {
    close: {
      on: {
        TOGGLE: "open",
      },
    },
    open: {
      on: {
        TOGGLE: "close",
      },
    },
  },
});

const { useMachineV2, useWatch, client } = createMachineV2({
  machine: {
    init: "open",
    transition: {
      close: {
        on: {
          OPEN: "open",
        },
      },
      open: {
        on: {
          CLOSE: "close",
        },
      },
    },
  },
  config: {
    onChange: (prev, curr) => {
      console.log("onChange global config", prev, curr);
    },
  },
});

const Box1: React.FC = () => {
  const { state, send } = useMachine();

  return (
    <div
      style={{
        border: "2px solid #4dabf7",
        padding: "20px",
        borderRadius: "8px",
        margin: "10px 0",
      }}
    >
      <h3>Box 1</h3>
      <p>
        State: <strong>{state}</strong>
      </p>
      <button
        onClick={() => send({ type: "TOGGLE" })}
        style={{
          padding: "8px 16px",
          fontSize: "14px",
          backgroundColor: "#4dabf7",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Toggle from Box 1
      </button>
    </div>
  );
};

const Box2: React.FC = () => {
  const { state, send } = useMachine();

  return (
    <div
      style={{
        border: "2px solid #51cf66",
        padding: "20px",
        borderRadius: "8px",
        margin: "10px 0",
      }}
    >
      <h3>Box 2</h3>
      <p>
        State: <strong>{state}</strong>
      </p>
      <button
        onClick={() => send({ type: "TOGGLE" })}
        style={{
          padding: "8px 16px",
          fontSize: "14px",
          backgroundColor: "#51cf66",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Toggle from Box 2
      </button>
    </div>
  );
};

export const HomePage: React.FC = () => {
  const instance = useMachineV2({
    onChange: (prev, curr) => {
      // console.log("onChange useMachineV2", prev, curr);
    },
    initState: "open",
  });
  const state = useWatch(instance, (state) => {
    console.log("state useWatch", state);
    return state;
  });
  return (
    <>
      <button onClick={() => instance[1]({ type: "CLOSE" })}>v2 CLOSE</button>
      {/* <button onClick={() => client.getEntity()({ type: "OPEN" })}>
        v2 OPEN
      </button> */}
      {instance[0]}
      {state}
    </>
    // <div style={{ padding: "20px" }}>
    //   <h1>Home</h1>
    //   <div style={{ marginTop: "20px" }}>
    //     <h2>Counter Demo</h2>
    //     <p>
    //       Count: <strong>{count}</strong>
    //     </p>
    //     <div style={{ display: "flex", gap: "10px" }}>
    //       <button
    //         onClick={() => setCount(count - 1)}
    //         style={{
    //           padding: "10px 20px",
    //           fontSize: "16px",
    //           backgroundColor: "#ff6b6b",
    //           color: "white",
    //           border: "none",
    //           borderRadius: "5px",
    //           cursor: "pointer",
    //         }}
    //       >
    //         -
    //       </button>
    //       <button
    //         onClick={() => setCount(0)}
    //         style={{
    //           padding: "10px 20px",
    //           fontSize: "16px",
    //           backgroundColor: "#868e96",
    //           color: "white",
    //           border: "none",
    //           borderRadius: "5px",
    //           cursor: "pointer",
    //         }}
    //       >
    //         Reset
    //       </button>
    //       <button
    //         onClick={() => setCount(count + 1)}
    //         style={{
    //           padding: "10px 20px",
    //           fontSize: "16px",
    //           backgroundColor: "#51cf66",
    //           color: "white",
    //           border: "none",
    //           borderRadius: "5px",
    //           cursor: "pointer",
    //         }}
    //       >
    //         +
    //       </button>
    //     </div>
    //   </div>
    //   {count % 2 === 0 ? (
    //     <>
    //       {/* Counter Section */}

    //       {/* State Machine Section */}
    //       <div style={{ marginTop: "30px" }}>
    //         <h2>React State Machine Demo</h2>
    //         <p>
    //           Current State: <strong>{state}</strong>
    //         </p>
    //         <div style={{ display: "flex", gap: "10px" }}>
    //           <button
    //             onClick={() => send({ type: "TOGGLE" })}
    //             style={{
    //               padding: "10px 20px",
    //               fontSize: "16px",
    //               backgroundColor: state === "open" ? "#ff6b6b" : "#51cf66",
    //               color: "white",
    //               border: "none",
    //               borderRadius: "5px",
    //               cursor: "pointer",
    //             }}
    //           >
    //             {state === "open" ? "Close" : "Open"}
    //           </button>

    //           <button
    //             onClick={() => send({ type: "TOGGLE" })}
    //             style={{
    //               padding: "10px 20px",
    //               fontSize: "16px",
    //               backgroundColor: "#4dabf7",
    //               color: "white",
    //               border: "none",
    //               borderRadius: "5px",
    //               cursor: "pointer",
    //             }}
    //           >
    //             Toggle
    //           </button>
    //         </div>

    //         <Box1 />
    //         <Box2 />
    //       </div>
    //     </>
    //   ) : null}
    // </div>
  );
};

export default HomePage;
