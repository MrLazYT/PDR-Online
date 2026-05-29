import type { ResetBtnProps } from "../../props/resetBtnProps";

export default function ResetBtn({ onClick }: ResetBtnProps) {
    return <button className="circle-btn btn-reset" onClick={onClick}></button>;
}
