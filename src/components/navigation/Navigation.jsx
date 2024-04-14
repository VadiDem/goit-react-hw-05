import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";

export default function Navigation() {
  return (
    <div className={css["header-page"]}>
      <NavLink
        exact
        to="/"
        className={({ isActive }) => (isActive ? css.active : css.links)}
      >
        Home
      </NavLink>
      <NavLink
        to="/movies"
        className={({ isActive }) => (isActive ? css.active : css.links)}
      >
        Movies
      </NavLink>
    </div>
  );
}