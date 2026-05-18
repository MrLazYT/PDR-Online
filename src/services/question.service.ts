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
        // const response = await fetch(`${this.path}/twenty_questions_sections.json`);

        // if (!response.ok) {
        //     throw new Error(`Failed to load sections: ${response.status}`);
        // }

        // const sections: TestType[] = await response.json();
        // const requests = sections.map((section) => this.getSectionQuestions(section.section_id));
        // const questionsBySections = await Promise.all(requests);
        // const allQuestions = questionsBySections.flat();

        const response = await fetch(`${this.path}/all_questions.json`);
        const allQuestions: Question[] = await response.json();

        return this.shuffle(allQuestions).slice(0, 20);
    }

    public static shuffle<T>(arr: T[]): T[] {
        const result = [...arr];

        for (let i = result.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i * 1));

            [result[i], result[j]] = [result[j], result[i]];
        }

        return result;
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
