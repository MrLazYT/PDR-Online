import { SPECIAL_TESTS } from "../constants/tests/SpecialTests";
import type { TestModeProps } from "../props/utils/testModesProps";

export default function isSpecialTest({ testId }: TestModeProps): boolean {
    return !!testId && SPECIAL_TESTS.includes(testId as (typeof SPECIAL_TESTS)[number]);
}
