/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { alertAction } from '../../store/actions/alertAction';
import { registerAction } from '../../store/actions/authAction';
import loadingImg from '../../img/loading.gif'

import validateEmail from '../../utils/validateEmail';
import validateNumber from '../../utils/validateNumber';
import './Register.css';
import { clubAction } from '../../store/actions/clubAction';
import 'firebase/auth'
const Register = (props) => {
    console.log(loadingImg);
    const histroy = useHistory()
    const [, setRegister] = useState(false)
    
  
    const [error, setError] = useState({
        name:{
            message:'',
            error: false
        },
        email:{
            message:'',
            error: false
        },
        phone:{
            message:'',
            error: false
        },
        username:{
            message:'',
            error: false
        },
        password:{
            message:'',
            error: false
        },
        confirmPassword:{
            message:'',
            error: false
        },
    })
    const [user,setUser] = useState({
        name:'',
        email:'',
        phone:'',
        username:'',
        sName:'admin',
        club:'60ea8f82fcabd2314dca0779',
        password:''
    })

    useEffect(()=>{
        props.clubAction()
    },[])

    const handleChange = e =>{
        const name = e.target.name, value = e.target.value
        
        if (name === 'email' || name === 'phone' || name === 'username' || name === 'password') {
            setUser({...user, [name]: value.trim()})
        }else{
            setUser({...user, [name]: value})
        }
        if (name === 'name') {
        
            if (value.length > 2 && value.length < 20) {
                setError({...error, name : {
                    message:'',
                    error: false
                }})
            }else{
                setError({...error, name : {
                    message:'Must be at least 3 characters',
                    error: true
                }})
            }
        }else if(name === 'email'){
            if (validateEmail(value)) {
                setError({...error, email : {
                    message:'',
                    error: false
                }})
            }else{
                setError({...error, email : {
                    message:'Invalid Email',
                    error: true
                }})
            }
        }else if(name === 'phone'){
            if (validateNumber(value)) {
                setError({...error, phone : {
                    message:'',
                    error: false
                }})
            }else{
                setError({...error, phone : {
                    message:'Invalid Phone Number',
                    error: true
                }})
            }
        }else if(name === 'username'){
            var usernameRegex = /^[a-zA-Z0-9]+$/;
            if (usernameRegex.test(value)) {
                if (value.length > 4 && value.length < 20) {
                setError({...error, username : {
                    message:'',
                    error: false
                }})
                }else{
                    setError({...error, username : {
                        message:'Invalid Username',
                        error: true
                    }})
                }
            }else{
                setError({...error, username : {
                    message:'Invalid Username',
                    error: true
                }})
                
            }
        }else if(name === 'password'){
            if (value.length > 5) {
                setError({...error, password : {
                    message:'',
                    error: false
                }})
            }else{
                setError({...error, password : {
                    message:'Must be at least 6 characters',
                    error: true
                }})
            }
        }else if(name === 'confirmPassword'){

            if (user.password === value) {
                setError({...error, confirmPassword : {
                    message:'',
                    error: false
                }})
            }else{
                setError({...error, confirmPassword : {
                    message:'Password Don\'t match',
                    error: true
                }})
            }
        }
    }

    const handleSubmit = () =>{
        let isValid = true;
        for (const key in error) {
            const input = error[key];
            if (input.error) {
                isValid = false;
            }
        }
        for (const key in user) {
            const input = user[key];
            if (!input) {
                isValid = false;
            }
        }
        if (user.phone[0]==='8') {
            user.phone = `+${user.phone}`
        }else if(user.phone[0]==='0'){
            user.phone = `+88${user.phone}`
        }
        if (isValid) {
                setRegister(true)
                props.registerAction(user, histroy)
                setUser({
                    name:'',
                    email:'',
                    phone:'',
                    username:'',
                    sName:'admin',
                    club:'60ea8f82fcabd2314dca0779',
                    password:''
                })
           
        }else{
            props.alertAction({
                message:'Please fill up this from',
                error: true
            })
        }
    }
    return (
        <div className="container">
                <div className="register">
                    <h1 style={{marginBottom:5}} >Register</h1>
                    <p>Please fill in this form to create an account.</p>
                    <hr/>
                    
                    <label htmlFor="name"><b>Full Name</b></label>
                    <input 
                        value={user.name} 
                        onChange={handleChange} 
                        type="text" 
                        placeholder="Full Name*" 
                        name="name" id="name" 
                        style={error.name.error? {marginBottom:5}: {marginBottom:22}}
                        required/>
                    <p className='error' >{error.name.message}</p>
                   

                    <label htmlFor="email"><b>Email</b></label>
                    <input 
                        value={user.email} 
                        onChange={handleChange} 
                        type="text" 
                        style={error.email.error? {marginBottom:5}: {marginBottom:22}}
                        placeholder="Enter Email*" 
                        name="email" id="email" 
                        required/>
                    <p className='error'>{error.email.message}</p>
                    
                    <label htmlFor="phone"><b>Phone Number</b></label>
                    <input 
                        value={user.phone} 
                        onChange={handleChange} 
                        type="text" 
                        placeholder="Phone Number*" 
                        name="phone" 
                        id="phone" 
                        style={error.phone.error? {marginBottom:5}: {marginBottom:22}}
                        required/>
                    <p className='error'>{error.phone.message}</p>
                    
                    <label htmlFor="username"><b>Username</b></label>
                    <input 
                        value={user.username} 
                        onChange={handleChange} 
                        type="text" 
                        placeholder="Enter Username*" 
                        name="username" 
                        style={error.username.error? {marginBottom:5}: {marginBottom:22}}
                        id="username" required/>
                    <p className='error'>{error.username.message}</p>
                    
                    <label htmlFor="sName"><b>Sponsor's Name</b></label>
                    <input 
                        value={user.sName} 
                        onChange={handleChange} 
                        type="text" 
                        placeholder="Enter Sponsor's Name" 
                        name="sName" 
                        id="sName"/>
                    
                    <label htmlFor="club"><b>Select Club</b></label>
                    <select onChange={handleChange} name="club"  id="club" >
                    <option value="60ea8f82fcabd2314dca0779">Select Club*</option>
                        {
                            props.club.map(club=>(
                                <option key={club._id} value={club._id}>{club.name}</option>
                            ))
                        }
                    </select>

                    <label htmlFor="password"><b>Password</b></label>
                    <input 
                        value={user.password} 
                        onChange={handleChange} 
                        type="password" 
                        placeholder="Enter Password*" 
                        name="password" 
                        id="password" 
                        style={error.password.error? {marginBottom:5}: {marginBottom:22}}
                        required/>
                    <p className='error'>{error.password.message}</p>

                    <label htmlFor="confirmPassword"><b>Confirm Password</b></label>
                    <input 
                        type="password" 
                        placeholder="Confirm Password*" 
                        name="confirmPassword" 
                        id="confirmPassword" 
                        onChange={handleChange}
                        style={error.confirmPassword.error? {marginBottom:5}: {marginBottom:22}}
                        required/>
                    <p className='error'>{error.confirmPassword.message}</p>
                    
                    <hr/>
                    <p>By creating an account you agree to our <Link to="/">Terms & Privacy</Link>.</p>

                    <button onClick={handleSubmit} type="submit" className={`registerbtn ${ loadingImg ? '' : 're-btn-container'}`}>
                    
                        Register
                    </button>
                </div>
                
                <div className="container signin">
                    <p>Already have an account? <Link to="/login">Sign in</Link>.</p>
                </div>
        </div>
    );
};
const mapStateToProps = state =>({
    auth: state.auth,
    alert: state.alert,
    club: state.club.club
})
export default connect(mapStateToProps, {registerAction, alertAction, clubAction } )(Register);
