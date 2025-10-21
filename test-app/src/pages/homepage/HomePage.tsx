import { useEffect, useState } from "react";
import { Scroll, useScroll, useScrollPosition } from "../../scrollium";
import { ScrolliumAxis } from "../../scrollium/types";

const SomeComponentUpper = () => {
  const client = useScroll("main");
  useEffect(() => {
    client?.subscribe("onScroll", (value: any) => {});
  }, [client]);
  return (
    <>
      <h1>Some Component Upper</h1>
    </>
  );
};

const SomeComponent = () => {
  const client = useScrollPosition();

  return <></>;
};
// const axis = "horizontal";
const axis: any = "vertical";
const HomePage = () => {
  const [counter, setCounter] = useState(0);
  const [axis, setAxis] = useState<ScrolliumAxis>(ScrolliumAxis.VERTICAL);
  return (
    <>
      <button onClick={() => setCounter(counter + 1)}>
        click me {counter}
      </button>
      <button
        onClick={() => {
          setAxis((prev) =>
            prev === ScrolliumAxis.VERTICAL
              ? ScrolliumAxis.HORIZONTAL
              : ScrolliumAxis.VERTICAL
          );
        }}
      >
        change axis
      </button>
      <h1>Axis: {axis}</h1>
      <div
        style={{
          height: "20rem",
          width: "20rem",
          background: "red",
        }}
      >
        <SomeComponentUpper />
        <Scroll
          axis={axis}
          id="main"
          onScroll={(value) => {
            console.log("onScroll", value);
          }}
        >
          <>
            {axis === ScrolliumAxis.HORIZONTAL ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "20px",
                }}
              >
                <SomeComponent />
                {Array.from({ length: 10 }).map((_, index) => (
                  <div
                    key={index}
                    style={{
                      flex: "0 0 300px",
                    }}
                  >
                    {index}
                  </div>
                ))}
              </div>
            ) : (
              <div>
                <SomeComponent />
                {Array.from({ length: 100 }).map((_, i) => (
                  <div
                    key={i}
                    style={{ background: i % 2 === 0 ? "blue" : "red " }}
                  >
                    {i}
                  </div>
                ))}
              </div>
            )}
          </>
        </Scroll>
      </div>
    </>
  );
};

export { HomePage };
