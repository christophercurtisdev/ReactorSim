import React, { useEffect, useState } from 'react';
import Game from '../Core/Game';

const FuelArraySwitchesComponent: React.FC = () => {
    let fuelRods = Game.getInstance().getFuelArray().fuelRods;
    return (
        <div>
            <div className='grid gap-1 grid-cols-50'>
                {fuelRods.map((column) => (
                    column.map((rod, index) => (
                        <div key={'rod'+index} className="border">{rod.fuelType}</div>
                    ))
                ))}
            </div>
        </div>
    );
}

export default FuelArraySwitchesComponent;