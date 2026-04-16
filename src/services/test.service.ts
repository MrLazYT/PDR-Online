import { BASE } from "../helpers/base.helper";
import type { TestType } from "../types/testData.type";

export class TestService {
    private static path: string = "../data";

    public static async getAllTests(): Promise<TestType[]> {
        const response = await fetch(`${BASE}${this.path}/tests/sections.json`);
        const data = await response.json();

        return data;
    }

    public static async getTest(testId: number): Promise<TestType | undefined> {
        const data = this.getAllTests();
        const curTestData = (await data).find((test) => test.section_id == testId);

        return curTestData;
    }
}
