import { Router } from "express";
import { Film } from "../types";

const films: Film[] = [
    {
        id: 1,
        title: "The Shawshank Redemption",
        director: "Frank Darabont",
        duration: 142,
        budget: 25000000,
        description: "Two imprisoned",
        imageUrl: "https://www.imdb.com/title/tt0111161/mediaviewer/rm10105600",
    },
    {
        id: 2,
        title: "The Godfather",
        director: "Francis Ford Coppola",
        duration: 175,
        budget: 6000000,
        description: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
        imageUrl: "https://www.imdb.com/title/tt0068646/mediaviewer/rm10105600",
    },
    {
        id: 3,
        title: "The Dark Knight",
        director: "Christopher Nolan",
        duration: 152,
        budget: 185000000,
        description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
        imageUrl: "https://www.imdb.com/title/tt0468569/mediaviewer/rm10105600",
    },
];

const router = Router();

router.get("/", (req, res) => {
    if (!req.query["minimum-duration"]) {
        return res.json(films);
    }
    const minimumDuration = Number(req.query["minimum-duration"]);
    if (isNaN(minimumDuration) || minimumDuration <= 0) {
        return res.status(400).json({ error: "Invalid minimum duration parameter" });
    }
    const filteredFilms = films.filter((film) => {
        return film.duration >= minimumDuration;
    });
    return res.json(filteredFilms);
});

router.post("/", (req, res) => {
    const body: unknown = req.body;
    if (
        !body ||
        typeof body !== "object" ||
        !("title" in body) ||
        !("director" in body) ||
        !("duration" in body) ||
        typeof body.title !== "string" ||
        typeof body.director !== "string" ||
        typeof body.duration !== "number" ||
        !body.title.trim() ||
        !body.director.trim() ||
        body.duration <= 0
    ) {
        return res.sendStatus(400);
    }

    const { title, director, duration, budget, description, imageUrl } = body as Film;

    if (films.some((film)=> film.title === title && film.director === director)) {
        return res.sendStatus(409);
    }

    const nextId =
        films.reduce((maxId, film) => (film.id > maxId ? film.id : maxId), 0) + 1;

    const newFilm: Film = {
        id: nextId,
        title,
        director,
        duration,
        budget,
        description,
        imageUrl,
    };

    films.push(newFilm);
    return res.json(newFilm);
});

router.get("/search", (req, res) => {
    if (!req.query["title"] || typeof req.query["title"] !== "string") {
        return res.sendStatus(400);
      }
    const title: string = req.query["title"];
    const filteredFilms = films.filter((film) => {
        return film.title.startsWith(title);
    });
    return res.json(filteredFilms);
});

//laisse ce truc a la fin !
router.get("/:id", (req, res) => {
    const id = Number(req.params.id);
    const film = films.find((film) => film.id === id);
    if (film) {
        res.json(film);
    } else {
        res.sendStatus(404);
    }
});

export default router;