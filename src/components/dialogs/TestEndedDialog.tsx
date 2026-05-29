import { useNavigate } from "react-router-dom";
import type { TestEndedDialogProps } from "../../props/dialogs/testEndedDialogProps";

export default function TestEndedDialog({ isShown, toggleShown }: TestEndedDialogProps) {
    const navigate = useNavigate();

    function goBack() {
        navigate("/tests");
    }

    return (
        <div className={`dialog-container ${isShown ? "" : "collapsed"}`}>
            <div id="dialog" className="dialog" role="dialog" aria-modal="true">
                <p className="dialog-title">Запитання до теми закінчилися</p>

                <div className="btn-ver-block">
                    <div className="btn btn-dialog">До попередньої теми</div>
                    <div className="btn btn-dialog" onClick={goBack}>
                        Повернутися до списку тем
                    </div>
                    <div className="btn btn-dialog" onClick={toggleShown}>
                        Залишитися і проаналізувати помилки
                    </div>
                    <div className="btn btn-dialog">До наступної теми</div>
                </div>
            </div>
            <div className="backdrop" onClick={toggleShown} />
        </div>
    );
}
