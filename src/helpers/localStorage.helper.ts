import type { Mistake } from "../types/mistake.type";

export function getMistakes(): Mistake[] {
    const data = localStorage.getItem("mistakes");

    if (!data) {
        return [];
    }

    const parsed: Mistake[] = JSON.parse(data);

    return parsed;
}

export function setMistakesToLocalStorage(mistakes: Mistake[]): void {
    const convertedMistakes = JSON.stringify(mistakes);

    localStorage.setItem("mistakes", convertedMistakes);
}

export function addMistakeToLocalStorage(mistake: Mistake): void {
    const mistakes: Mistake[] = getMistakes();

    mistakes.push(mistake);

    setMistakesToLocalStorage(mistakes);
}

export function removeMistake(questionId: number): void {
    const mistakes: Mistake[] = getMistakes();

    mistakes.filter((mistake) => mistake.question_id !== questionId);

    setMistakesToLocalStorage(mistakes);
}

export function removeMistakes(): void {
    localStorage.removeItem("mistakes");
}
