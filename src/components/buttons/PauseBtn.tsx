import type { PauseBtnProps } from "../../props/pauseBtnProps";

export default function PauseBtn({ onClick }: PauseBtnProps) {
    return (
        <button className="circle-btn btn-pause" onClick={onClick}>
            <div className="pause-icon">
                <i></i>
                <i></i>
            </div>
        </button>
    );
}
