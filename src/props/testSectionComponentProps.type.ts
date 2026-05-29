import type { Mistake } from "../types/mistake.type";
import type { TestType } from "../types/testData.type";

export interface TestSectionComponentProps {
    section: TestType;
    mistakes?: Mistake[];
    isExtended: boolean;
    onToggle: () => void;
    progressVisualization: "percent" | "circle";
    showConfigBtns: boolean;
    mode?: "tests" | "mistakes";
}
