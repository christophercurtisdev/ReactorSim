export default function CRTCopmonent({content, border = true, vignette = true}) {

    let crtContentClass = (border ? 'border p-1 ' : '') + 'rounded-2xl max-h-full h-full';
    let crtClass = vignette ? '' : 'no-vignette';

    return (
        <div className="max-h-full h-full rounded-xl border-8 border-t-mauve-900 border-l-mauve-900 border-b-mauve-700 border-r-mauve-700">
            <div className={"crt p-2 max-h-full h-full " + crtClass}>
                <div className={crtContentClass}>
                    {content}
                </div>
            </div>
        </div>
    );
}