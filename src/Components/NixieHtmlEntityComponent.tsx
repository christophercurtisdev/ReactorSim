import { useEffect, useState } from "react";

export default function NixieHtmlEntity({ nixieIcons }: { nixieIcons: Array<Array <String>> }) {
    const [litIcon, setLitIcon] = useState(0);

    // let litNixieIconClass = 'z-50 text-neon-'+FuelType.COLOUR(fuelRod.fuelType)+' text-3xl font-bold font-mono absolute top-1 left-1';
    let unlitNixieIconClass = 'text-unlit-neon text-3xl font-bold font-mono absolute top-1 left-1';

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

    // useEffect(() => {

    // }, [])

    const icons = nixieIcons.map((icon) => 
        <div className={unlitNixieIconClass} dangerouslySetInnerHTML={{ __html: icon[0] }} />
    );

    return (
        <div className="relative">
            {icons}
        </div> 
    );
}