import type { Mistake } from "../types/mistake.type";
import type { TestType } from "../types/testData.type";

export function getMistakes(): Mistake[] {
    const data = localStorage.getItem("mistakes");

    if (!data) {
        return [];
    }

    try {
        const parsed = JSON.parse(data) as Mistake[];

        return parsed;
    } catch {
        return [];
    }
}

export function getMistakeBySectionId(sectionId: string): Mistake[] {
    return getMistakes().filter((mistake) => mistake.section_id === sectionId);
}

export function setMistakesToLocalStorage(mistakes: Mistake[]): void {
    const convertedMistakes = JSON.stringify(mistakes);

    localStorage.setItem("mistakes", convertedMistakes);
}

export function addMistakeToLocalStorage(mistake: Mistake): void {
    const mistakes: Mistake[] = getMistakes();

    const isAlreadySaved = mistakes.some(
        (curMistake) => curMistake.question_id == mistake.question_id && curMistake.section_id === mistake.section_id,
    );

    if (isAlreadySaved) return;

    setMistakesToLocalStorage([...mistakes, mistake]);
}

export function removeMistake(questionId: number, sectionId: string): void {
    const mistakes: Mistake[] = getMistakes();

    const updatedMistakes = mistakes.filter(
        (mistake) => !(mistake.question_id == questionId && mistake.section_id === sectionId),
    );

    setMistakesToLocalStorage(updatedMistakes);
}

export function removeMistakes(): void {
    localStorage.removeItem("mistakes");
}

export function getSectionProgresses(): TestType[] {
    const data = localStorage.getItem("sections");

    if (!data) {
        return [];
    }

    try {
        const parsed = JSON.parse(data) as TestType[];

        return parsed;
    } catch {
        return [];
    }
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

    if (sectionIndex === -1) return;

    const updatedSection = [...sections];
    updatedSection[sectionIndex] = section;

    setSectionProgress(updatedSection);
}
