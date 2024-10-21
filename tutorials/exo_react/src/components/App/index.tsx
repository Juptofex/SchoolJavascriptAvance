import "./App.css";
import Cinema from "../Cinema";
import { Header } from "../Header";
import { Footer } from "../Footer";
import { PageTitle } from "../PageTitle";

const App = () => {
  const pageTitle = "Informations sur les films dans les cinémas";

  const cinema1Name = "UGC DeBrouckère";

  const moviesCinema1 = [
  {
    title: "HAIKYU-THE DUMPSTER BATTLE",
    director: "Susumu Mitsunaka",
  },
  {
    title: "GOODBYE JULIA",
    director: "Mohamed Kordofani",
  },
  {
    title: "INCEPTION",
    director: "Christopher Nolan",
  },
  {
    title: "PARASITE",
    director: "Bong Joon-ho",
  },
];

const cinema2Name = "UGC Toison d'Or";

const moviesCinema2 = [
  {
    title: "THE WATCHERS",
    director: "Ishana Night Shyamalan",
  },
  {
    title: "BAD BOYS: RIDE OR DIE",
    director: "Adil El Arbi, Bilall Fallah",
  },
  {
    title: "TENET",
    director: "Christopher Nolan",
  },
  {
    title: "THE IRISHMAN",
    director: "Martin Scorsese",
  },
]; 

  
  return (
    <main>
      <Header 
        logo="data:image/png;base64,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"
        children={<p>Cinemas de Vinci</p>}
      >
      </Header>
      <PageTitle title={pageTitle} />
      <Cinema name={cinema1Name} movies= {moviesCinema1} />
      <Cinema name={cinema2Name} movies={moviesCinema2} />
      <Footer children={<p>© 2024 - Tous droits réservés</p>}>
      </Footer>
    </main>
  );
};


export default App;
