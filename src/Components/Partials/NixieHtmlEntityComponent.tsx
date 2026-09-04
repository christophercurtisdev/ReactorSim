import { useState } from "react";

interface NixieHtmlEntityProps {
    nixieIcons: Array<Array<String>>;
    litIcon?: number;
}

export default function NixieHtmlEntity({ nixieIcons, litIcon = -1 }: NixieHtmlEntityProps) {
    const [litIconIndex, setLitIcon] = useState(litIcon);

    let nixieIconClass = ' text-3xl font-bold font-mono absolute nixie-icon';

    // Validate html entity
    nixieIcons.forEach(function(icon, index) {
        // Only hex allowed for now: &#x2668;
        if (icon[0]) {
            let valid = true;
            valid = valid && icon[0].substring(0,2) == '&#';
            valid = valid && icon[0].substring(7,8) == ';';
            valid = valid && icon[0].length == 8;
            if (!valid) {
                nixieIcons[index] = [];
            }
        }
    });

    const icons = nixieIcons.map((icon, index) => {
        let nixieClass;
        if (index == litIcon) {
            nixieClass = 'z-50 text-neon-'+icon[1]+nixieIconClass;
        } else {
            nixieClass = 'text-unlit-neon opacity-50' + nixieIconClass;
        }

        return (<div key={index} className={nixieClass} dangerouslySetInnerHTML={{ __html: icon[0] }} />)
    });

    return (
        <div className="nixie-icon-container">
            {icons}
        </div> 
    );
}