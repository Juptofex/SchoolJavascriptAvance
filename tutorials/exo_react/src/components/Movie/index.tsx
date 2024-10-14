interface Movie {
    title: string;
    director: string;
  }
  
  const Movie = ({ title, director }: Movie) => {
    return (
      <li>
        <strong>{title}</strong> - Réalisateur : {director}
      </li>
    );
  };

  export default Movie;