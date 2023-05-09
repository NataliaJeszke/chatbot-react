import { NavLink } from "react-router-dom";
import "./Navigation.css";

export function Navigation() {
  return (
    <nav className="nav">
      <ul className="menu">
        <li>
          <NavLink exact to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/about">About</NavLink>
        </li>
        <li>
          <NavLink to="/contact">Contact</NavLink>
        </li>
      </ul>
    </nav>
  );
}
