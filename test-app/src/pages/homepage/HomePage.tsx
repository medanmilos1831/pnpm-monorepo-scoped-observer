import { useEffect, useState } from "react";
import {
  Scroll,
  useScroll,
  useScrolliumSelector,
  useScrollCommands,
} from "../../scroll";

const SomeComponent = () => {
  const scroll = useScrollCommands();
  const client = useScroll();
  console.log("client", client);
  return (
    <div>
      <h1>SomeComponent</h1>
      <button
        onClick={() =>
          scroll.scrollToEnd({
            behavior: "smooth",
          })
        }
      >
        Scroll to end
      </button>
    </div>
  );
};

const ScrollComponent = () => {
  const [count, setCount] = useState(0);
  return (
    <>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <div style={{ height: "15rem", width: "15rem" }}>
        {count % 2 === 0 ? (
          <Scroll
            id="scroll-one"
            // onScroll={(params) => console.log("scroll", params)}
          >
            <>
              <SomeComponent />
              {Array.from({ length: 100 }).map((_, index) => (
                <div key={index} style={{ backgroundColor: "red" }}>
                  <h2>Item {index}</h2>
                </div>
              ))}
            </>
          </Scroll>
        ) : (
          <div>
            <h1>Nema scroll</h1>
          </div>
        )}
      </div>
    </>
  );
};

const HomePage = () => {
  return (
    <>
      <h1>HomePage</h1>
      <ScrollComponent />
    </>
  );
};

export { HomePage };
