import { Scroll, useScrollPosition } from "../../scrollium";
const SomeComponent = () => {
  const value = useScrollPosition();

  return <div>Some Component</div>;
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
