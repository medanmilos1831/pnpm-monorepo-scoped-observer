import React from "react";
import { createMachine } from "../../react-state-machine";
const { useMachine, useWatch, client } = createMachine({
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

export const HomePage: React.FC = () => {
  const instance = useMachine({
    onChange: (prev, curr) => {
      // console.log("onChange useMachine", prev, curr);
    },
    initState: "open",
  });
  // const state = useWatch(instance, (state) => {
  //   return state;
  // });
  return (
    <>
      <button onClick={() => instance[1]({ type: "CLOSE" })}>CLOSE</button>
      <button
        onClick={() => {
          console.log(client.getEntity(instance).handler({ type: "OPEN" }));
        }}
      >
        OPEN
      </button>
      {instance[0]}
      {client.getEntity(instance).state}
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
