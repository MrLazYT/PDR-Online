import type { Question } from "../types/question.type";
import type { TestType } from "../types/testData.type";

export class QuestionService {
    private static path: string = "/data/tests";

    public static async getAllQuestions(testId: string): Promise<Question[]> {
        if (testId === "twenty-questions" || testId === "exam") {
            return this.getTwentyRandomQuestions();
        }
        if (testId === "top-difficult") {
            return this.getTopDifficult();
        }

        return this.getSectionQuestions(parseInt(testId));
    }

    public static async getTwentyRandomQuestions(): Promise<Question[]> {
        const response = await fetch(`${this.path}/twenty_questions_sections.json`);
        const sections: TestType[] = await response.json();

        const allQuestions: Question[] = [];

        for (const section of sections) {
            const sectionQuestions = await this.getSectionQuestions(section.section_id);
            allQuestions.push(...sectionQuestions);
        }

        return this.shuffle(allQuestions).slice(0, 20);
    }

    public static shuffle<T>(arr: T[]): T[] {
        return [...arr].sort(() => Math.random() - 0.5);
    }

    public static async getTopDifficult(): Promise<Question[]> {
        const response = await fetch(`${this.path}/top_difficult.json`);
        const data = await response.json();

        return data;
    }

    public static async getSectionQuestions(testID: number): Promise<Question[]> {
        const response = await fetch(`${this.path}/${testID}.json`);
        const data = await response.json();

        return data;
    }
}
