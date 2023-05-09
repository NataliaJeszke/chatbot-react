import { Link, NavLink } from "react-router-dom";
import "./Navigation.css";

export function Navigation() {
  return (
    <nav className="nav-wrapper active purple lighten-1">
      <Link to="/" className="nav-title">
        Librarian
      </Link>
      <ul id="nav-mobile" className="right">
        <li>
          <NavLink to="/">
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
