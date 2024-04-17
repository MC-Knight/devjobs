import logo from "../assets/desktop/logo.svg";
import ThemeToggle from "./ThemeToggle";

function Logo() {
  return (
    <div className="logo">
      <img src={logo} alt="logo" />
      <ThemeToggle />
    </div>
  );
}

export default Logo;
