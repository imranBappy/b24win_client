import React, {useState} from 'react';
import axios from 'axios';
import store from './../../store/store';
import validEmail from '../../utils/validateEmail'
import {useHistory} from 'react-router-dom';

const Forget = () => {
    const history = useHistory()
    const [email, setEmail] = useState('');
    const [otp ,setOtp] = useState(false);
    const handleSubmit = async () =>{
        if(validEmail(email)){
            const result = await axios.post('https://b24win.herokuapp.com/user/forger', {email:email.toLocaleLowerCase().trim()});
        
            store.dispatch({
                type: 'SET_ALERT',
                payload:{
                    message: result.data.message,
                    error:result.data.error
                }
            })
            if(!result.data.error){
                setOtp(true)
                setEmail('')
            }
            }else{
    
        }
        
        
    }

    const handleOtp = async () => {
        const result = await axios.post('https://b24win.herokuapp.com/user/forger-check', {otp:email});
        store.dispatch({
            type: 'SET_ALERT',
            payload:{
                message: result.data.message,
                error:result.data.error
            }
        })
        setOtp(result.data.error)
        setEmail('')
        history.push('/login')
    }
    const handleChange = e =>{
        setEmail(e.target.value)
    }
    return (
        <div className='container'>
             <input 
                onChange={handleChange}
                value={email}
                type="text" 
                placeholder={`Enter ${otp? 'OTP': 'Email*'}`}
                name={`${otp? 'otp': 'Email*'}`}
                id="email" required/>
            <button onClick={otp ? handleOtp : handleSubmit}>{otp? 'Send Password' :'Send OTP'}</button>
        </div>
    );
};

export default Forget;