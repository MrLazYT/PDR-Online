export class TestService {
    private static path: string = "../data";

    public static async getAllTests(): Promise<any[]> {
        const response = await fetch(`${this.path}/tests/sections.json`);
        const data = await response.json();

        return data;
    }

    public static async getTest(testId: number): Promise<any> {
        const data = this.getAllTests();
        const curTestData = (await data).find(test => test.section_id == testId);

        return curTestData;
    }
}