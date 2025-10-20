import { useEffect } from "react";
import { Scroll, useScroll } from "../../scrollium";

const SomeComponentUpper = () => {
  const client = useScroll("main");
  console.log("RENDER", client);
  useEffect(() => {
    client?.subscribe("onScroll", (value: any) => {
      console.log("ON_SCROLL", value.payload);
    });
  }, [client]);
  return (
    <>
      <h1>Some Component Upper</h1>
    </>
  );
};

const SomeComponent = () => {
  const client = useScroll("main");

  return (
    <div>
      Some Component
      <button
        onClick={() =>
          client.scrollTo({
            top: client.getScrollHeight(),
            behavior: "smooth",
          })
        }
      >
        Scroll to top
      </button>
    </div>
  );
};
const HomePage = () => {
  return (
    <>
      <div
        style={{
          height: "20rem",
          width: "20rem",
          background: "red",
        }}
      >
        <SomeComponentUpper />
        <Scroll
          id="main"
          onScroll={(value) => {
            // console.log("onScroll", value)
          }}
        >
          <>
            <SomeComponent />
            {Array.from({ length: 100 }).map((_, i) => (
              <div
                key={i}
                style={{ background: i % 2 === 0 ? "blue" : "red " }}
              >
                {i}
              </div>
            ))}
          </>
        </Scroll>
      </div>
    </>
  );
};

export { HomePage };
