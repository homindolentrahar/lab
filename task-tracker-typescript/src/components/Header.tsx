import Button from "./Button";
import { useLocation } from "react-router-dom";

type HeaderProps = { text: string; onAdd: () => void };

const Header = ({ text, onAdd }: HeaderProps) => {
  const location = useLocation();

  return (
    <header className="header">
      <h1>Task Tracker with Typescript</h1>
      {location.pathname === "/" && (
        <Button
          text={text}
          onClick={onAdd}
          color={text === "Add" ? "green" : "red"}
        />
      )}
    </header>
  );
};

export default Header;
