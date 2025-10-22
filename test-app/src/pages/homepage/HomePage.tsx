import { useState } from "react";
import { useScroll, Scroll } from "../../scroll";

const SomeComponent = () => {
  const scroll = useScroll("main");
  console.log("scroll", scroll);
  return (
    <div>
      <h1>Some Component</h1>
    </div>
  );
};

const HomePage = () => {
  const [axis, setAxis] = useState<any>("vertical");
  return (
    <>
      <h1>Home Page</h1>
      <button
        onClick={() => setAxis(axis === "vertical" ? "horizontal" : "vertical")}
      >
        {axis}
      </button>
      <SomeComponent />
      <div style={{ height: "20rem", width: "20rexm", background: "red" }}>
        <Scroll
          id="main"
          onScroll={(data) => {
            console.log("data", data);
          }}
          axis={axis}
        >
          <>
            {axis === "horizontal" ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "20px",
                }}
              >
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
