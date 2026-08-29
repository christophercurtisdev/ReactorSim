import { useEffect, useState } from "react";
import Game from "../Core/Game";

export default function AnimationScreenComponent() {
    const [enableAnimation, setEnableAnimation] = useState(Game.getInstance().getIsRunning());

    useEffect(() => {
        // Subscribe to stop start updates
        const unsubscribeFromStopStartUpdates = Game.getInstance().listenToStopStartEvents((isRunning) => {
            setEnableAnimation(isRunning);
        });

        return () => {
            // Unsubscribe from this component
            unsubscribeFromStopStartUpdates();
        };
    }, []);

    return (
        <div className="justify-center items-center flex h-full">
            <div className="crt flex h-full w-full justify-center items-center">
                <div className="cube-container">
                    <div className={ enableAnimation ? "cube" : "cube stopped" }>
                        <div className={ enableAnimation ? "face front" : "face front stopped" }></div>
                        <div className={ enableAnimation ? "face back" : "face back stopped" }></div>
                        <div className={ enableAnimation ? "face right" : "face right stopped" }></div>
                        <div className={ enableAnimation ? "face left" : "face left stopped" }></div>
                        <div className={ enableAnimation ? "face top" : "face top stopped" }></div>
                        <div className={ enableAnimation ? "face bottom" : "face bottom stopped" }></div>
                    </div>
                </div>
            </div>
        </div>
    );
}