import type { TextHelpSliderBlockProps } from "../props/textHelpSliderBlockProps";
import HelpSliderBlock from "./HelpSliderBlock";

export default function TextHelpSliderBlock({ title, text }: TextHelpSliderBlockProps) {
    return (
        <HelpSliderBlock title={title}>
            <span
                dangerouslySetInnerHTML={{
                    __html: new DOMParser().parseFromString(text ?? "", "text/html").documentElement.textContent ?? "",
                }}
            />
        </HelpSliderBlock>
    );
}
