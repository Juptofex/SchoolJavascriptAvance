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

router.get("/", (_req, res) => {
    res.json(films);
});

export default router;