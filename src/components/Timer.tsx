import type { TimerComponentProps } from "../props/timerComponentProps.types";

function formatTime(totalSeconds: number) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return {
        minutes: String(minutes).padStart(2, "0"),
        seconds: String(seconds).padStart(2, "0"),
    };
}

export default function Timer({ title, seconds }: TimerComponentProps) {
    const time = formatTime(seconds);

    return (
        <div className="timer">
            <p className="timer-title">{title}</p>
            <p className="timer-text">
                <span className="minutes">{time.minutes}</span>
                <span className="separator"> : </span>
                <span className="seconds">{time.seconds}</span>
            </p>
        </div>
    );
}
