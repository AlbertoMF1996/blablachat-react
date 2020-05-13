import React, { useState } from 'react'
import "./nav.scss"



const Burger = () => {

    

    // var open = false;
    const handleClick = () => {
        // Menu icon control

        if (document.getElementById("burguerStyle").classList.contains("close-menu")) {
            document.getElementById("burguerStyle").classList.add('open-menu');
            document.getElementById("burguerStyle").classList.remove('close-menu');
        } else {
            document.getElementById("burguerStyle").classList.add('close-menu');
            document.getElementById("burguerStyle").classList.remove('open-menu');
        }

        // Menu list control

        if (document.getElementById("ulNavRight").classList.contains("close-menu-list")) {
            document.getElementById("ulNavRight").classList.add('open-menu-list');
            document.getElementById("ulNavRight").classList.remove('close-menu-list');
        } else {
            document.getElementById("ulNavRight").classList.add('close-menu-list');
            document.getElementById("ulNavRight").classList.remove('open-menu-list');
        }

    }

    return (
        <>
            <div id="burguerStyle" className="close-menu" onClick={handleClick}>
                <div />
                <div />
                <div />
            </div>
            <ul id="ulNavRight" className="close-menu-list">
                <li>Home</li>
                <li>About us</li>
                <li>Contact us</li>
                <li>sign in</li>
            </ul>
        </>
    )

}

export default Burger
