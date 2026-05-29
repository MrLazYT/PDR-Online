import { getSectionProgress, updateSectionProgress } from "../helpers/localStorage.helper";
import type { SaveTestProgressProps } from "../props/utils/saveTestProgressProps";
import type { TestType } from "../types/testData.type";
import isSpecialTest from "./testModes";

export default function SaveTestProgress({ testId, answeredQuestions }: SaveTestProgressProps) {
    if (isSpecialTest({ testId })) return;

    const sectionProgress = getSectionProgress(parseInt(testId));

    if (!sectionProgress) return;

    const correctQuestions = answeredQuestions.filter((question) => question.isRight == true);

    const updatedProgress: TestType = {
        section_id: sectionProgress.section_id,
        title: sectionProgress.title,
        total: sectionProgress.total,
        correct: String(correctQuestions.length),
        completed: String(answeredQuestions.length),
    };

    updateSectionProgress(updatedProgress);
}
