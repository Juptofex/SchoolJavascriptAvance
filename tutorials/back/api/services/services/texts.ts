import path from "node:path";
import { Text, NewText } from "../types";
import { parse, serialize } from "../utils/json";
import { v4 as uuidv4 } from "uuid";
import { validate as uuidValidate } from 'uuid';
const jsonDbPath = path.join(__dirname, "/../data/texts.json");

const defaultText: Text[] = [
    {
       id: "eecfbbd7-9276-44ca-80ec-20e51fe68880",
       content: "Hello World",
       level: "easy",
    },
    {
         id: "f2f1f3f4-9276-44ca-80ec-20e51fe68880",
         content: "This is a test",
         level: "medium",
     },
     {
         id: "4b4a1c7e-95cc-49af-a4db-86ea0902ec94",
         content: "I'm a string",
         level: "hard",
    }
];

function readAllTexts(level: string): Text[] {
    const texts = parse(jsonDbPath, defaultText);
    if (!level) {
        return texts;
    }

    const filteredTexts = texts.filter((text) => {
        return text.level === level;
    });
    return filteredTexts;
}

function readOneText(id: string): Text | undefined {
    if (!uuidValidate(id)) {
        throw new Error("Invalid UUID");
    }
    const texts = parse(jsonDbPath, defaultText);
    return texts.find((text) => text.id === id);
}

function createText(newText: NewText): Text {
    const texts = parse(jsonDbPath, defaultText);
    const Text = { 
        id: uuidv4(),
        ...newText, 
         
    };

    texts.push(Text);
    serialize(jsonDbPath, texts);

    return Text;
}

function deleteText(id: string): Text | undefined {
    if (!uuidValidate(id)) {
        throw new Error("Invalid UUID");
    }
    const texts = parse(jsonDbPath, defaultText);
    const index = texts.findIndex((text) => text.id === id);
    if (index === -1) {
        return undefined;
    }

    const deletedElements = texts.splice(index, 1);
    serialize(jsonDbPath, texts);
    return deletedElements[0];
}

function updateText(id: string, newText: Partial<NewText>): Text | undefined {
    if (!uuidValidate(id)) {
        throw new Error("Invalid UUID");
    }
    const texts = parse(jsonDbPath, defaultText);
    const text = texts.find((text) => text.id === id);
    if (!text) {
        return undefined;
    }

    const updatedText = {
        ...text,
        ...newText,
    };

    const index = texts.findIndex((text) => text.id === id);
    texts[index] = updatedText;
    serialize(jsonDbPath, texts);

    return updatedText;
}

export { 
    readAllTexts, 
    readOneText, 
    createText, 
    deleteText, 
    updateText 
};