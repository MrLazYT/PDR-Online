import type { QuestionHelpBlockProps } from "../props/questionHelpBlockProps";
import TextHelpSliderBlock from "./TextHelpSliderBlock";
import VideoHelpSliderBlock from "./VideoHelpSliderBlock";

export default function QuestionHelpBlock({ currentQuestion }: QuestionHelpBlockProps) {
    return (
        <div className="help-block">
            <TextHelpSliderBlock title="Пункти ПДР" text={currentQuestion.pdd_section} />

            {currentQuestion.expert_comment && (
                <TextHelpSliderBlock title="Допомога Експерта" text={currentQuestion.expert_comment} />
            )}

            {currentQuestion.video && <VideoHelpSliderBlock title="Відеопідказка" video={currentQuestion.video} />}
        </div>
    );
}
