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
];

const router = Router();

router.get("/", (req, res) => {
    if (!req.query["minimum-duration"]) {
        // Cannot call req.query.minimum-duration as "-" is an operator
        return res.json(films);
      }
    const minimumDuration = Number(req.query["minimum-duration"]);
    const filteredFilms = films.filter((film) => {
        return film.duration >= minimumDuration
    });
    return res.json(filteredFilms);
});

router.get("/:id", (req, res) => {
    const id = Number(req.params.id);
    const film = films.find((film) => film.id === id);
    if (film) {
        res.json(film);
    } else {
        res.sendStatus(404);
    }
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


export default router;