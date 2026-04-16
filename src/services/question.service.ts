import type { Question } from "../types/question.type";

export class QuestionService {
    private static path: string = "/data";

    public static async getAllQuestions(testID: number): Promise<Question[]> {
        const response = await fetch(`${this.path}/tests/${testID}.json`);
        const data = await response.json();

        return data;
    }
}
