import { Movie } from "../types";

interface MovieProps {
    movies: Movie[]
  }

const MovieList = ({movies}: MovieProps) => {
    return (
        <div>
        <h1>My Movies</h1>
        <ul>
          {movies.map((movie, index) => (
            <li key={index}>
              <h2>{movie.titre}</h2>
              <p>{movie.director}</p>
              <p>{movie.length} minutes</p>
            </li>
          ))}
        </ul>
      </div>
    );
};

export default MovieList;