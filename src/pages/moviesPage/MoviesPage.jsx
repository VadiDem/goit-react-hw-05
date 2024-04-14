import MovieList from "../../components/movieList/MovieList";
import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Loader from "../../components/loader/Loader";
import axios from "axios";
import css from "./MoviesPage.module.css";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const query = searchParams.get("search");
    if (query) {
      setSearchQuery(query);
      fetchMovies(query);
    }
  }, [searchParams]);

  const fetchMovies = async (query) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/search/movie?query=${query}&language=en-US`,
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
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setSearchParams({ search: searchQuery });
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit} className={css["form"]}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchInputChange}
          placeholder="Search movies by title"
          className={css["input"]}
        />
        <button type="submit" className={css["btn-submit"]}>
          Search
        </button>
      </form>
      {loading && <Loader />}
      {error && <p>Error: {error}</p>}
      {!loading && !error && <MovieList movies={movies} />}
    </div>
  );
}