import { useEffect, useState, useRef } from "react";
import axios from "axios";
import {
  useParams,
  Outlet,
  NavLink,
  Link,
  useLocation,
} from "react-router-dom";
import Loader from "../../components/loader/Loader";
import css from "./MovieDetailsPage.module.css";

export default function MovieDetailsPage() {
  const [movie, setMovie] = useState({});
  const { movieId } = useParams();
  const location = useLocation();
  const backLinkRef = useRef(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMjA5ZTFiOTkwNzgyNWYyODAxYzZjY2VhNjI2OTY2YiIsInN1YiI6IjY1ZmIzZTg5NzcwNzAwMDE3YzA3MTAxYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tZhisAEz8ENxy4QWWhtgfqFY2KAaerZZjXQ_pHK-Gao",
              accept: "application/json",
            },
          }
        );
        setMovie(response.data);
      } catch (error) {
        console.error("Error:", error);
        throw error;
      }
    };
    fetchMovieDetails();
  }, [movieId]);

  useEffect(() => {
    if (backLinkRef.current) {
      backLinkRef.current.focus();
    }
  }, [location]);

  if (!movie || !movie.title) {
    return <Loader />;
  }

  return (
    <div className={css["container"]}>
      <Link
        to={location.state?.from || "/movies"}
        ref={backLinkRef}
        className={css["btn-back"]}
      >
        Back
      </Link>
      <div className={css["container-info"]}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
          alt={movie.title}
          className={css["img-movie"]}
        />
        <div className={css["container-details"]}>
          <h2>{movie.title}</h2>
          <div className={css["overwiew-container"]}>
            <p className={css["overview-title"]}>Overview</p>
            <p>{movie.overview}</p>
          </div>
          <p>
            <span className={css["rating-title"]}>Average rating:</span>{" "}
            {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
          </p>

          <p>
            <span className={css["release-title"]}>Release Date:</span>{" "}
            {movie.release_date}
          </p>
        </div>
      </div>
      <div className={css["btn-links"]}>
        <NavLink
          to={`/movies/${movieId}/cast`}
          className={css["btn-links-item"]}
        >
          Cast
        </NavLink>
        <NavLink
          to={`/movies/${movieId}/reviews`}
          className={css["btn-links-item"]}
        >
          Reviews
        </NavLink>
      </div>
      <Outlet />
    </div>
  );
}