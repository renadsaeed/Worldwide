import { useNavigate } from "react-router-dom";
import Button from "./Button";

export default function Backbutton() {
  const Navigation = useNavigate();
  return (
    <Button
      type="back"
      onClick={(e) => {
        e.preventDefault();
        Navigation(-1);
      }}
    >
      &larr; Back
    </Button>
  );
}
