import { useWatch } from "../../../services/visibilityService";

export function HomeFooter() {
  const { callbackValue } = useWatch("userModal", (state) => {
    return {
      footerBackground: state === "open" ? "red" : "blue",
    };
  });

  return (
    <div style={{ backgroundColor: callbackValue.footerBackground }}>
      <span>Homepage footer - thanks for visiting!</span>
    </div>
  );
}
