export class QuestionService {
    private static path: string = "../data";

    public static async getAllQuestions(testID: number): Promise<any[]> {
        const response = await fetch(`${this.path}/tests/${testID}.json`);
        const data = await response.json();

        console.log(data);

        return data;
    }
}