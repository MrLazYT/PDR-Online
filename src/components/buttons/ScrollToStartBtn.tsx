import type { ScrollToStartBtnProps } from "../../props/scrollToStartBtnProps";
import QuestionBtn from "./QuestionBtn";

export default function ScrollToStartBtn({ scrollToStart }: ScrollToStartBtnProps) {
    return <QuestionBtn title={"<<"} onClick={scrollToStart} />;
}
