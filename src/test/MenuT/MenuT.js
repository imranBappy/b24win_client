import React from 'react';
import './MenuT.css';
const MenuT = () => {
    function myFunction() {
    var x = document.getElementById("myTopnav");
        if (x.className === "topnav") {
            x.className += " responsive";
        } else {
            x.className = "topnav";
        }
    }
    return (
        <div>
                        
            <div className="topnav" id="myTopnav">
                <a href="#home" className="active">Home</a>
                <a href="#news">News</a>
                <a href="#contact">Contact</a>
                <a href="#about">About</a>
                <a href="#a" className="icon" onClick={myFunction}>
                    <i className="fa fa-bars">X</i>
                </a>
            </div>

            <div >
            <h2>Responsive Topnav Example</h2>
            <p>Resize the browser window to see how it works.</p>
            </div>

        </div>
    );
};

export default MenuT;