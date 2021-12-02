/* eslint-disable jsx-a11y/alt-text */
import React, { useContext, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link,useLocation } from 'react-router-dom';
import logo from '../../img/logo.png';
import { logoutAction } from '../../store/actions/authAction';
import Alert from '../Alert/Alert';
import { MenuContext, ModalContext } from '../Layout/Layout';
import './media.css';
import './Navbar.css';
import menuIcon from '../../img/menu.webp'
const Navbar = (props) => {
    const location = useLocation();
    const {alert, auth} = props;
    const [, setOpen] = useContext(ModalContext)
    const [menu, setMenu] = useContext(MenuContext)

    const handleClick = () =>{
        setMenu(!menu)
    }
    const [time, setTime] = useState()
    useEffect(()=>{
        setInterval(() => {
            setTime(new Date().toLocaleTimeString())
        }, 1000);
    },[]);

    return (
        <>
         <header>
             <div className="header">
            <nav>
                <div className="container">
                    <div className="time">
                        <h3 style={{height: 5 , marginTop:8, fontSize:17, textAlign: 'left'}}>{time? time : ''}</h3>
                        <p style={{textAlign:'left'}} >{new Date().toLocaleDateString()}</p>
                    </div>
                    <div className="link-aria">
                        <a href="/">
                            <img src={logo} alt="icon"/>
                        </a>
                        <ul> 
                            <li><Link to="/">Home</Link></li>

                            <li>
                                <Link to={auth.isAuthenticated ? '/statement' : '/login'}>
                                {auth.isAuthenticated ? 'Dashboard' : 'Login'}
                                </Link>
                            </li>
                            {
                                !auth.isAuthenticated && <li><Link to="/Register">Register</Link></li>
                            }
                            <li><Link to="/about">About</Link></li>
                            <li><Link to="/contact">Contact</Link></li>
                        </ul>
                    </div>
                    <div className="icon-aria">
                        <div className="icon">
                            <img onClick={handleClick} src={menuIcon}/>
                        </div>
                        <Link to="/">
                            <img src={logo} alt="icon"/>
                        </Link>
                    </div>
                </div>
            </nav>
        </div>
        {
            location.pathname === '/' ?
             auth.isAuthenticated ? 
             <div className="login-aria">
                <div onClick={()=> setOpen({display: 'block', component:'TransactionInput'})} ><button >Deposit</button></div>
                <div><button >Balance: {auth.user.balance}</button></div>
            </div>
            :
            <div className="login-aria">
                <div><Link to="/login">Login</Link></div>
                <div><Link to="/register">Register</Link></div>
            </div>
            :''
         }
         </header>
         {
             menu ? 
         <div className="menu" >
            <ul>
                {
                    auth.isAuthenticated ?<>
                    <li><Link to="/statement">Dashboard</Link></li>
                    <li><Link to="/about">About</Link></li>
                            <li><Link to="/contact">Contact</Link></li>
                    </> : <>
                    <li>
                        <Link  to={'/register'}>
                            {'Register'}
                        </Link>
                    </li>
                    <li>
                        <Link to={'/login'}>
                            {'Login'}
                        </Link>
                    </li>
                    <li><Link to="/about">About</Link></li>
                            <li><Link to="/contact">Contact</Link></li>
                    </>
                }
            </ul>
        </div>: ''
        }
        {
            alert.message  && <div className='container'><Alert/></div>
        }  
        </>
    );
};

const mapStateToProps = state =>({
    alert: state.alert,
    auth: state.auth
})

export default connect(mapStateToProps, {logoutAction })(Navbar);
