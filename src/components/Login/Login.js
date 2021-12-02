import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { alertAction } from '../../store/actions/alertAction';
import { loginAction } from '../../store/actions/authAction';
import { Link } from 'react-router-dom'
import '../Register/Register.css';

const Login = (props) => {
    const history = useHistory();
    const [error, setError] = useState({
        username:{
            message:'',
            error: false
        },
        password:{
            message:'',
            error: false
        },
    })
    const [user,setUser] = useState({
        username:'',
        password:''
    })
    const handleChange = e =>{
        const name = e.target.name, value = e.target.value.trim()
        const users = {...user, [name]: value}
        setUser(users)
        if(name === 'username'){
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
                    message:'Invalid Password',
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

        if (isValid) {
            props.loginAction(user, history)
            setUser({
                username:'',
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
        <div>
                <div className="container">
                    <h1 style={{marginBottom:5}} >Login</h1>
                    <hr/>
                    
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
                    
                    <button onClick={handleSubmit} type="submit" className="registerbtn">Login</button>
                </div>
                
                <div className="container signin">
                    <p>I Have a no account? <Link to="/register">Sign in</Link>.</p>
                    <p>Forget you password ? <Link to="/forget">Forget</Link>.</p>

                </div>
        </div>
    );
};
const mapStateToProps = state =>({
    auth: state.auth
})
export default connect(mapStateToProps, {loginAction, alertAction } )(Login);
