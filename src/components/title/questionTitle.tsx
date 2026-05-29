import type { TitleProps } from "../../props/titleProps";

export default function QuestionTitle({ title }: TitleProps) {
    return (
        <h2 className="question-title">
            <span dangerouslySetInnerHTML={{ __html: title }} />
        </h2>
    );
}
