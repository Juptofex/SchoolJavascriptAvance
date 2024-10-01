import { Router } from 'express';
import { NewFilm } from '../types';
import {
    createOneFilm,
    deleteOneFilm,
    readAllFilms,
    readOneFilm,
    searchFilm,
    updateOneFilm,
} from '../services/films';

const router = Router();


router.get("/", (req, res) => {
    const minDuration = Number(req.query["minimum-duration"]);
    const film = readAllFilms(minDuration);
    return res.json(film);
});

//Mettre avant le /:id sinon, il va prendre "search" comme un id et ne pas rentrer dans la fonction de search
router.get("/search", (req, res) => {
    const films = searchFilm(req.query["title"] as string);
    return res.json(films);
});



//Garder le /:id après le /search sinon, il va prendre "search" comme un id et ne pas rentrer dans la fonction de search
router.get("/:id", (req, res) => {
    const id = Number(req.params.id);
    const film = readOneFilm(id);
    if (!film) {
        return res.sendStatus(404);
    }
    return res.json(film);
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
    const { title, director, duration, budget, description, imageUrl } = body as NewFilm;
    const newFilm = createOneFilm({ title, director, duration, budget, description, imageUrl });
    return res.json(newFilm);
});

//films/{id}	DELETE	DELETE ONE : Effacer la ressource identifiée
router.delete("/:id", (req, res) => {
    const id = Number(req.params.id);
    const film = deleteOneFilm(id);
    if (!film) {
        return res.sendStatus(404);
    }
    return res.json(film);
});

//films/{id}	PATCH	UPDATE ONE : Mettre à jour les propriétés de la ressource par les valeurs données dans la requête, pour une ou plusieurs propriétés
router.patch("/:id", (req, res) => {
    const id = Number(req.params.id);
    const film = readOneFilm(id);
    if (!film) {
        return res.sendStatus(404);
    }
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
    const { title, director, duration, budget, description, imageUrl } = body as NewFilm;
    const updatedFilm = updateOneFilm(id, { title, director, duration, budget, description, imageUrl });
    return res.json(updatedFilm);
});

//films/{id}	PUT	UPDATE ONE or CREATE ONE : Remplacer la ressource par une ressource reprenant les valeurs données dans la requête, seulement si toutes les propriétés non optionnelles de la ressource sont données ! Si la ressource n'existe pas, créer cette ressource seulement si l'id donné n'est pas déjà existant.
router.put("/:id", (req, res) => {
    const id = Number(req.params.id);
    const film = readOneFilm(id);
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
    const { title, director, duration, budget, description, imageUrl } = body as NewFilm;
    if (film) {
        const updatedFilm = updateOneFilm(id, { title, director, duration, budget, description, imageUrl });
        return res.json(updatedFilm);
    } else {
        const newFilm = createOneFilm({ title, director, duration, budget, description, imageUrl });
        return res.json(newFilm);
    }
});

export default router;