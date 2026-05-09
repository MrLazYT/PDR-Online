import type { Mistake } from "../types/mistake.type";
import type { TestType } from "../types/testData.type";

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

export function getSectionProgresses(): TestType[] {
    const data = localStorage.getItem("sections");

    if (!data) {
        return [];
    }

    const parsed: TestType[] = JSON.parse(data);

    return parsed;
}

export function getSectionProgress(sectionId: number): TestType | undefined {
    const sections = getSectionProgresses();

    const section = sections.find((cur_section) => cur_section.section_id == sectionId);

    return section;
}

export function setSectionProgress(sections: TestType[]): void {
    const convertedSectionProgress: string = JSON.stringify(sections);

    localStorage.setItem("sections", convertedSectionProgress);
}

export function updateSectionProgress(section: TestType): void {
    const sections = getSectionProgresses();

    const sectionIndex: number = sections.findIndex((cur_section) => cur_section.section_id == section.section_id);

    sections[sectionIndex] = section;

    setSectionProgress(sections);
}
