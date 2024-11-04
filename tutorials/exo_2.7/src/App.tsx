import { SyntheticEvent, useState } from 'react'
import './App.css'
import { Movie } from './types'
import MovieList from './Main/MovieList'

const defaultMovies = [
  {
    titre: "The Matrix",
    director: "Lana Wachowski, Lilly Wachowski",
    length: 136,
  },
  {
    titre: "The Matrix Reloaded",
    director: "Lana Wachowski, Lilly Wachowski",
    length: 138,
  },
  {
    titre: "The Matrix Revolutions",
    director: "Lana Wachowski, Lilly Wachowski",
    length: 129,
  },
  {
    titre: "The Matrix Resurrections",
    director: "Lana Wachowski",
    length: 148,
  },
  {
    titre: "Inception",
    director: "Christopher Nolan",
    length: 148,
  }
];

function App() {
  const [movie, setMovie] = useState('')
  const [director, setDirector] = useState('')
  const [length, setLength] = useState(0)
  const [movies, setMovies] = useState(defaultMovies)

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    console.log('submit:', movie, director, length)
    const newMovie: Movie = {
      titre: movie,
      director: director,
      length: length,
    };

    setMovies([...movies, newMovie])
  };

  const handleMovieChange = (e: SyntheticEvent) => {
    const movieInput = e.target as HTMLInputElement
    console.log('change in movieInput:', movieInput.value)
    setMovie(movieInput.value)
  };

  const handleDirectorChange = (e: SyntheticEvent) => {
    const directorInput = e.target as HTMLInputElement
    console.log('change in directorInput:', directorInput.value)
    setDirector(directorInput.value)
  };

  const handleLengthChange = (e: SyntheticEvent) => {
    const lengthInput = e.target as HTMLInputElement
    console.log('change in lengthInput:', lengthInput.value)
    setLength(parseInt(lengthInput.value))
  };

  return (
    <>
      <MovieList movies={movies} />
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor='movie'>movie</label>
          <input
            value={movie}
            type='text'
            id='movie'
            name='movie'
            onChange={handleMovieChange}
            required
          />
          <label htmlFor='director'>director</label>
          <input
            value={director}
            type='text'
            id='director'
            name='director'
            onChange={handleDirectorChange}
            required
          />
          <label htmlFor='length'>length</label>
          <input
            value={length}
            type='number'
            id='length'
            name='length'
            onChange={handleLengthChange}
            required
          />
          <button  type='submit'>Ajouter</button>
        </form>
      </div>
    </>
  )
}

export default App
