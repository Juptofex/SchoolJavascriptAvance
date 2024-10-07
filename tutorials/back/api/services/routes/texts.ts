import { Router } from "express";
import { NewText } from "../types";
import {
  createText,
  deleteText,
  readAllTexts,
  readOneText,
  updateText
} from "../services/texts";

const router = Router();

router.get("/", (req, res) => {
  const level = req.query["level"] as string;
  const texts = readAllTexts(level);
  return res.json(texts);
});

router.get("/:id", (req, res) => {
  const id = String(req.params.id);
  const text = readOneText(id);
  if (!text) {
    return res.sendStatus(404);
  }
  return res.json(text);
});

router.post("/", (req, res) => {
  const body: unknown = req.body;
  if (
    !body ||
    typeof body !== "object" ||
    !("level" in body) ||
    !("content" in body) ||
    typeof body.level !== "string" ||
    typeof body.content !== "string" ||
    !body.level.trim() ||
    !body.content.trim()
  ) {
    return res.sendStatus(400);
  }

  const { content, level } = body as NewText;

  const newText = createText({ content, level });
  return res.json(newText);
});

router.delete("/:id", (req, res) => {
  const id = String(req.params.id);
  const deletedText = deleteText(id);
  if (!deletedText) {
    return res.sendStatus(404);
  }
  return res.json(deletedText);
});

router.put("/:id", (req, res) => {
  const id = String(req.params.id);
  const body: unknown = req.body;
  if (
    !body ||
    typeof body !== "object" ||
    !("level" in body) ||
    !("content" in body) ||
    typeof body.level !== "string" ||
    typeof body.content !== "string" ||
    !body.level.trim() ||
    !body.content.trim()
  ) {
    return res.sendStatus(400);
  }

  const updatedText = updateText(id, body as Partial<NewText>);
  if (!updatedText) {
    return res.sendStatus(404);
  }
  return res.json(updatedText);
});

export default router;
