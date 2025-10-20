import { Scroll, useScrollPosition } from "../../scrollium";
import { useScroll } from "../../scrollium/react-intergation/hooks/useScroll";
const SomeComponent = () => {
  const value = useScrollPosition();
  console.log("value", value);
  return <div>Some Component</div>;
};
const SomeButton = () => {
  const client = useScroll("main");
  return (
    <button
      onClick={() =>
        client.scrollTo({
          top: 0,
          behavior: "smooth",
        })
      }
    >
      Scroll to top
    </button>
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
            <SomeButton />
          </>
        </Scroll>
      </div>
    </>
  );
};

export { HomePage };
