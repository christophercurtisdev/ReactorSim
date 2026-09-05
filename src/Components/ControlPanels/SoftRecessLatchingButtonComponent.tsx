import React, { useState } from "react";

interface SoftRecessLatchingButtonProps {
    onCheck?: () => void;
    onUncheck?: () => void;
    checked?: boolean;
    disabled?: boolean;
    icon: React.JSX.Element;
}

export default function SoftRecessLatchingButton({ 
    onCheck = () => {}, 
    onUncheck = () => {}, 
    checked = false,
    disabled = false,
    icon }: SoftRecessLatchingButtonProps) {

    const [isChecked, setChecked] = useState(checked);
    const [isDisabled, setIsDisabled] = useState(disabled);

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
            <input type="checkbox" onChange={onToggle} checked={isChecked} disabled={isDisabled}/>
            <div className="checkmark">
                <div className="glow"></div>
                {icon}
            </div>
        </label>
    );
}