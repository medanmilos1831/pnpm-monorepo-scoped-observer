import { Scroll, useScroll, useScrolliumSelector } from "../../scroll";
const SomeComponent = () => {
  const client = useScroll();
  return (
    <div>
      <h1>Some Component</h1>
    </div>
  );
};

const SelectorComponent = () => {
  const client = useScrolliumSelector("scroll-1");
  console.log(client);
  return (
    <div>
      <button onClick={() => client?.commands.scrollToEnd()}>
        Scroll to 100
      </button>
      <h1>Selector Component</h1>
    </div>
  );
};

const HomePageScroll = () => {
  return (
    <>
      <div>
        <h1>Home Page Scroll</h1>
      </div>
      <SelectorComponent />
      <div style={{ height: "10rem" }}>
        <Scroll
          id="scroll-1"
          axis="vertical"
          onScroll={(payload) => {
            // console.log(payload);
          }}
        >
          <SomeComponent />
          {new Array(50).fill(0).map((_, index) => (
            <div
              key={index}
              style={{
                backgroundColor: index % 2 === 0 ? "red" : "blue",
              }}
            >
              <h1>Item {index}</h1>
            </div>
          ))}
        </Scroll>
      </div>
    </>
  );
};

export { HomePageScroll };
