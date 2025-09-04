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
  const arr = useMachine({
    name: "homepage-modal",
    onChange: (prev, curr) => {
      console.log("onChange local config", prev, curr);
    },
    initState: "open",
  });

  return (
    <>
      <button onClick={() => arr[1]({ type: "CLOSE" })}>CLOSE</button>
      <button onClick={() => arr[1]({ type: "OPEN" })}>OPEN</button>

      <div>
        <p>Raw State: {arr[0]}</p>
        <p>
          Is Open:{" "}
          {useWatch(arr, (state: any) => state === "open") ? "Yes" : "No"}
        </p>
      </div>

      <button
        onClick={() =>
          client.getEntityByName("homepage-modal")?.handler({ type: "CLOSE" })
        }
      >
        Close via Client
      </button>
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
