import { Scroll } from "../../scrollium/react-intergation/Scroll/ScrollProvider";

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
        <Scroll id="main">
          {Array.from({ length: 100 }).map((_, i) => (
            <div key={i} style={{ background: i % 2 === 0 ? "blue" : "red " }}>
              {i}
            </div>
          ))}
        </Scroll>
      </div>
    </>
  );
};

export { HomePage };
