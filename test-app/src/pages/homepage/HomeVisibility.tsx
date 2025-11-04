import { useVisibility } from "../../visibilityService";
const HomeVisibility = () => {
  const visibility = useVisibility({
    id: "test",
    initState: "on",
  });
  console.log("visibility", visibility);
  return <div>HomeVisibility</div>;
};

export default HomeVisibility;
