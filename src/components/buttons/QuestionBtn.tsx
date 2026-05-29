import type { QuestionBtnProps } from "../../props/questionBtnProps";

export default function QuestionBtn({ title, className, onClick }: QuestionBtnProps) {
    return (
        <button className={`btn btn-question ${className}`} onClick={onClick}>
            {title}
        </button>
    );
}
