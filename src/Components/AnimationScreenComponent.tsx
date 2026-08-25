export default function AnimationScreen() {
    return (
        <div className="justify-center items-center flex h-full">
            <div className="cube-container">
                <div className="cube">
                    <div className="face front"></div>
                    <div className="face back"></div>
                    <div className="face right"></div>
                    <div className="face left"></div>
                    <div className="face top"></div>
                    <div className="face bottom"></div>
                </div>
            </div>
        </div>
    );
}