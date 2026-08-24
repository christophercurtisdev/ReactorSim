import React, { useEffect, useState } from 'react';
import Game from '../Core/Game';
import FuelRodSwitchComponent from './FuelRodSwitchComponent';

export default function FuelArraySwitchesComponent() {
    let fuelRods = Game.getInstance().getFuelArray().fuelRods;
    return (
        <div className='overflow-scroll h-full'>
            <div className='grid gap-1 grid-flow-col grid-rows-5'>
                {fuelRods.map((column, columnIndex) => (
                    column.map((rod, rowIndex) => (
                        // <label key={'rod'+(rowIndex * (columnIndex + 1))} className="switch">
                        //     <input className="fuel-rod-checkbox" type="checkbox" />
                        //     <span className="toggle">
                        //         <span className="left">{rowIndex + (column.length * (columnIndex)) + 1}</span>
                        //         <span className="right green">&#8226;</span>
                        //     </span>
                        // </label>
                        <FuelRodSwitchComponent fuelRod={rod} />
                    ))
                ))}
            </div>
        </div>
    );
}