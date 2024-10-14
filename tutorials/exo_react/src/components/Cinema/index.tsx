import Movie from "../Movie";

interface CinemaProps {
    name: string;
    movies: Movie[];
  }
  
  const Cinema = ({ name, movies }: CinemaProps) => {
    return (
      <div>
        <h2>{name}</h2>
        <ul>
          {movies.map((movie, index) => (
            <Movie key={index} {...movie} />
          ))}
        </ul>
      </div>
    );
  };

  export default Cinema;