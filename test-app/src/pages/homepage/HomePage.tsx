import { SomeUiElement, useReferenceSelector } from "../../UIReferenceStore";
const LeftSide = () => {
  console.log("RENDER LEFT SIDE");
  useReferenceSelector("some-ui-element-one");
  // useReferenceSelector("some-ui-element-two");
  return (
    <div>
      <h1>LeftSide</h1>
    </div>
  );
};
const RightSide = () => {
  console.log("RENDER RIGHT SIDE");
  return (
    <div>
      <h1>RightSide</h1>
    </div>
  );
};

const HomePage = () => {
  console.log("RENDER HOME PAGE");
  return (
    <div>
      <h1>HomePage</h1>
      <div style={{ display: "flex" }}>
        <div style={{ width: "50%" }}>
          <LeftSide />
        </div>
        <div style={{ width: "50%" }}>
          <RightSide />
        </div>
      </div>
      <SomeUiElement id="some-ui-element-one" />
      {/* <SomeUiElement id="some-ui-element-two" /> */}
    </div>
  );
};

export { HomePage };
