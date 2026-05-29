import { useState } from "react";
import type { HelpSliderProps } from "../props/helpSliderProps";

export default function HelpSliderBlock({ title, children }: HelpSliderProps) {
    const [isOpened, setIsOpened] = useState(false);

    function toggleSlider() {
        setIsOpened(!isOpened);
    }

    return (
        <div className="help-slider" onClick={toggleSlider}>
            <div className="help-slider-title">{title}</div>

            <div className={`help-slider-content ${isOpened ? "" : "collapsed"}`}>{children}</div>
        </div>
    );
}
