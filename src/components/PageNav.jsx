import { NavLink, Link } from "react-router-dom";
import { nav } from "./PageNav.module.css";
import Logo from "./Logo";

export default function PageNav() {
  return (
    <nav className={nav}>
      <Logo />
      <ul>
        <li>
            <NavLink to="/pricing" >Pricing</NavLink>
        </li>
        <li>
            <NavLink to="/product" >Product</NavLink>
        </li>
        <li>
            <Link to="/login" className="cta" >Login</Link>
        </li>
      </ul>
    </nav>
  );
}