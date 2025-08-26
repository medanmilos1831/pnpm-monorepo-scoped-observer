import { getItem } from "../../../services/visibilityService";
export function HomeHeader() {
  return (
    <div>
      <span>Welcome to our amazing homepage!</span>
      <button
        onClick={() => {
          getItem("userModal").open({ message: "Hello from HomeHeader!" });
        }}
      >
        Open Modal
      </button>
    </div>
  );
}
