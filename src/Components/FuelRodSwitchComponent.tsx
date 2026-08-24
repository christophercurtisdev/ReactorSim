import React, { useEffect, useState } from 'react';
import FuelRod from '../Reactor/Objects/FuelRod';

export default function FuelRodSwitchComponent({fuelRod}: {fuelRod: FuelRod}) {
    return (
        <label className="switch">
            <input className="fuel-rod-checkbox" type="checkbox" />
            <span className="toggle">
                <span className="left">{fuelRod.label}</span>
                <span className="right green">&#8226;</span>
            </span>
        </label>
    );
}