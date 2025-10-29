import { Scroll, useScroll, useScrollPosition } from "../../scroll";

const SomeComponent = () => {
  const scroll = useScrollPosition();
  console.log(scroll);
  return (
    <div>
      <h1>SomeComponent</h1>
    </div>
  );
};

const HomePage = () => {
  return (
    <>
      <h1>HomePage</h1>
      <div style={{ height: "15rem", width: "15rem" }}>
        <Scroll id="scroll-one">
          <>
            <SomeComponent />
            {Array.from({ length: 100 }).map((_, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: index % 2 === 0 ? "red" : "blue",
                }}
              >
                <h2>Item {index}</h2>
              </div>
            ))}
          </>
        </Scroll>
      </div>
    </>
  );
};

export { HomePage };
