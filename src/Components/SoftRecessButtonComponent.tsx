export default function SoftRecessButton() {
    return (
        <label className="container">
            <input type="checkbox" />
            <div className="checkmark">
                <svg xmlns="http://www.w3.org/2000/svg" className="ionicon" viewBox="0 0 512 512">
                    <title>Checkmark</title>
                    {/* <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M416 128L192 384l-96-96"></path> */}
                    <path d="M150 5 L75 200 L225 200 Z" fill="none" stroke="currentColor" stroke-width="32" />
                </svg>
            </div>
        </label>
    );
}