import { useEffect, useState } from "react";
import type { TestType } from "../types/testData.type";
import TopMenu from "../components/TopMenu";
import { getMistakes, getSectionProgresses, setSectionProgress } from "../helpers/localStorage.helper";
import TestSection from "../components/TestSection";
import MistakesDescription from "../components/MistakesDescription";
import type { Mistake } from "../types/mistake.type";
import { testsTopMenuItems } from "../constants/menus/testsTopMenuItems";

export default function Mistakes() {
    const [testSections, setTestSections] = useState<TestType[]>([]);
    const [extendedTestId, setExtendedTestId] = useState<number>();
    const [mistakes, setMistakes] = useState<Mistake[]>([]);

    useEffect(() => {
        async function fetchTestSections() {
            const sections = getSectionProgresses();

            if (sections.length == 0) {
                const response = await fetch("../data/tests/sections.json");
                const data: TestType[] = await response.json();
                setSectionProgress(data);

                setTestSections([...data]);
            } else {
                setTestSections([...sections]);
            }
        }

        fetchTestSections();
    }, []);

    useEffect(() => {
        const mistakes = getMistakes();

        setMistakes(mistakes);
    }, []);

    function extendTest(testId: number) {
        setExtendedTestId(extendedTestId == testId ? 0 : testId);
    }

    return (
        <>
            <TopMenu topMenuItems={testsTopMenuItems} selectedItem={3} />

            <div className="container">
                <div className="test-sections">
                    <MistakesDescription />

                    {testSections.map((section) => (
                        <TestSection
                            key={section.section_id}
                            section={section}
                            mistakes={mistakes}
                            isExtended={extendedTestId == section.section_id}
                            onToggle={() => extendTest(section.section_id)}
                            progressVisualization="circle"
                            showConfigBtns={false}
                            mode="mistakes"
                        />
                    ))}
                </div>
            </div>
        </>
    );
}
