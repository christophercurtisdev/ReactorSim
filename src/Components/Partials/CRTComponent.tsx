export default function CRTCopmonent({content, border = true}) {

    let borderClass = (border ? 'border p-1 ' : '') + 'rounded-2xl max-h-full h-full';

    return (
        <div className="max-h-full h-full rounded border-8 border-t-yellow-900 border-l-yellow-900 border-b-yellow-700 border-r-yellow-700">
            <div className="crt p-2 max-h-full h-full">
                <div className={borderClass}>
                    {content}
                </div>
            </div>
        </div>
    );
}