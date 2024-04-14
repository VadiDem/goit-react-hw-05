import { useState, useEffect } from "react";
import axios from "axios";
import MovieList from "../../components/movieList/MovieList";
import Loader from "../../components/loader/Loader";
import css from "./HomePage.module.css";

export default function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get(
          "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MmVlMzg2YmYwOTQ2NGY4MTA5NGJmODdkODY3MzdiMyIsInN1YiI6IjY2MTZlNjdmY2E0ZjY3MDE3ZGM4ZTE5YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Qxul817j6sw0997Y7ybzWX3wvENEAgtOY9261cQrZd4",
              accept: "application/json",
            },
          }
        );
        setMovies(res.data.results);
      } catch (error) {
        alert(error);
        console.log(error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className={css["container"]}>
      <h1 className={css['home-title']}>Tranding today</h1>
      {movies.length > 0 ? <MovieList movies={movies} /> : <Loader />}
    </div>
  );
}