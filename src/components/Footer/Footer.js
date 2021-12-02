import React from 'react';
import bank from '../../img/bank.png'
import './Footer.css'
const Footer = () => {
    return (
        <div className="footer">
            <div className="container">
               <div className="footer__container">
               <p>Copyright © B24win.com 2021.</p>
                <div className="footer__img">
                    <img src={bank}  alt='bank'/>
                </div>
               </div>
            </div>
        </div>
    );
};

export default Footer;