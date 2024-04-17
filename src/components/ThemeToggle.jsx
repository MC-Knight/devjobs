import sun from "../assets/desktop/icon-sun.svg";
import moon from "../assets/desktop/icon-moon.svg";
import { useEffect } from "react";

function ThemeToggle() {
  const changeMode = () => {
    const isDark = localStorage.getItem("dark") === "true";
    localStorage.setItem("dark", !isDark);
    const button = document.querySelector(".theme-toggle-btn");
    button.classList.toggle("dark-mode");
    document.body.classList.toggle("dark-mode");
  };

  useEffect(() => {
    const isDark = localStorage.getItem("dark") === "true";
    if (isDark) {
      const button = document.querySelector(".theme-toggle-btn");
      button.classList.add("dark-mode");
      document.body.classList.add("dark-mode");
    }
  }, []);

  return (
    <div className="theme-toggle">
      <img src={sun} alt="lightmode" />
      <button className="theme-toggle-btn" onClick={changeMode} />
      <img src={moon} alt="darkmode" />
    </div>
  );
}

export default ThemeToggle;
