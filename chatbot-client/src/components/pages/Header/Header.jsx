import { Navigation } from "../Navigation/Navigation";
import "./Header.css";
export function Header() {
  return (
    <div className="header-container">
      <a href="/" className="nav-title">
        Librarian
      </a>
      <Navigation />
    </div>
  );
}
