export default function ClockComponent() {
    let increments = [];
    for (let index = 0; index < 60; index++) {
        increments.push(<div className="clock-increment text-xs text-neon-pink">&#x2303;</div>);
    }
    let content = (<div className="clock">
            {increments}
    </div>)
    return (content);
}