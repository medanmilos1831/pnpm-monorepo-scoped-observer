const HomePageScroll = () => {
  return (
    <>
      <div>
        <h1>Home Page Scroll</h1>
      </div>
      <div style={{ height: "10rem" }}>
        {/* <Scroll id="scroll-1" axis="vertical" onScroll={(payload) => {}}>
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
        </Scroll> */}
      </div>
    </>
  );
};

export { HomePageScroll };
