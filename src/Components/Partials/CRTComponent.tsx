export default function CRTCopmonent({content, border = true}) {

    let borderClass = (border ? 'border p-1 ' : '') + 'rounded-2xl max-h-full h-full';

    return (
        <div className="max-h-full h-full max-w-full w-full border-2 rounded">
            <div className="max-h-full h-full rounded border-4 border-t-gray-900 border-l-gray-900 border-b-gray-700 border-r-gray-700">
                <div className="crt p-2 max-h-full h-full">
                    <div className={borderClass}>
                        {content}
                    </div>
                </div>
            </div>
        </div>
    );
}