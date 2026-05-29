export default function MistakesDescription() {
    return (
        <div className="mistakes-description">
            <div className="description-col">
                <div className="circle red"></div>
                <p> - менше 30% правильних відповідей</p>
            </div>

            <div className="description-col">
                <div className="circle yellow"></div>
                <p> - більше 30% правильних відповідей</p>
            </div>

            <div className="description-col">
                <div className="circle green"></div>
                <p> - більше 70% правильних відповідей</p>
            </div>
        </div>
    );
}
