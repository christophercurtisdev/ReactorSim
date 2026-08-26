import React from "react";

interface SoftRecessLatchingButtonProps {
    onCheck: () => void;
    onUncheck: () => void;
    checked: boolean;
    icon: React.JSX.Element;
}

export default function SoftRecessLatchingButton({ onCheck, onUncheck, checked, icon }: SoftRecessLatchingButtonProps) {
    const [isChecked, setChecked] = React.useState(checked);

    const onToggle = () => {
        setChecked(!isChecked);
        if (isChecked) {
            onCheck();
        } else {
            onUncheck();
        }
    }
    
    return (
        <label className="soft-recess-button-container">
            <input type="checkbox" onChange={onToggle} checked={!isChecked}/>
            <div className="checkmark">
                <div className="glow"></div>
                {icon}
            </div>
        </label>
    );
}