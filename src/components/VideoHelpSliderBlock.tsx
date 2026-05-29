import type { VideoHelpSliderBlockProps } from "../props/videoHelpSliderBlockProps";
import HelpSliderBlock from "./HelpSliderBlock";

export default function VideoHelpSliderBlock({ title, video }: VideoHelpSliderBlockProps) {
    return (
        <HelpSliderBlock title={title}>
            <iframe
                className="iframe-video"
                src={`https://www.youtube.com/embed/${video}?mute=1&enablejsap=1`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; enablejsap;"
            />
        </HelpSliderBlock>
    );
}
