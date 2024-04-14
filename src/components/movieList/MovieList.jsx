import { NavLink, useLocation } from "react-router-dom";
import css from "./MovieList.module.css";

export default function MovieList({ movies }) {
  const location = useLocation();

  return (
    <div>
      <ul className={css["movie-list"]}>
        {movies.map((movie) => (
          <li key={movie.id}>
            <NavLink
              to={`/movies/${movie.id}`}
              state={{ from: location }}
              className={css["movie-link"]}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                alt={movie.title}
              />
              {movie.title}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}