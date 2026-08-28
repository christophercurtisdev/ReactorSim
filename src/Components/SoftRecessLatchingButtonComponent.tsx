import React, { useState } from "react";

interface SoftRecessLatchingButtonProps {
    onCheck?: () => void;
    onUncheck?: () => void;
    checked?: boolean;

    icon: React.JSX.Element;
}

export default function SoftRecessLatchingButton({ onCheck = () => {}, onUncheck = () => {}, checked = false, icon }: SoftRecessLatchingButtonProps) {
    const [isChecked, setChecked] = useState(checked);

    const onToggle = () => {
        if (!isChecked) {
            onCheck();
        } else {
            onUncheck() ?? {};
        }
        setChecked(!isChecked);
    }
    
    return (
        <label className="soft-recess-button-container">
            <input type="checkbox" onChange={onToggle} checked={isChecked}/>
            <div className="checkmark">
                <div className="glow"></div>
                {icon}
            </div>
        </label>
    );
}