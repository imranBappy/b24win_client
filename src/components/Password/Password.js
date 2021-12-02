import React, { useState } from 'react';
import { connect } from 'react-redux';
import { changePassAction } from '../../store/actions/authAction';

const Password = (props) => {
    const [password, setPassword] = useState({
        newPassword:'',
        confirmPassword:"",
        error:'',
        password:''
    })
    const handleChange = e =>{
        console.log(e.target.name);
        setPassword({...password, [e.target.name]:e.target.value})
        if (e.target.name === 'confirmPassword') {
            if (password.newPassword !== e.target.value) {
                setPassword({...password, [e.target.name]:e.target.value, error:'Password dose not match'})
                return 0;
            }else{
                setPassword({...password, error:''})
            }
        }
        if (e.target.value.length < 6) {
            setPassword({...password, [e.target.name]:e.target.value, error:'Input Valid Password'})
        }else{
            setPassword({...password, [e.target.name]:e.target.value, error:''})
        }
    }
    const handleSubmit = () =>{
        if (password.confirmPassword.length < 5){
            setPassword({...password, error:'Input valid password'})
            return 0 ;
          }else{
            setPassword({...password, error:''})
          }
        if (!password.error) {
            props.changePassAction({pass:password.password, newPass:password.newPassword})
        }
    }
    return (
        <div className="container">
               <label htmlFor="password"><b>New Password</b></label>
                    <input 
                        // value={user.password} 
                        type="text" 
                        
                        onChange={handleChange} 
                        placeholder="New Password*" 
                        name="newPassword" 
                        id="password" 
                        // style={error.password.error? {marginBottom:5}: {marginBottom:22}}
                        required/>
                    {/* <p className='error'>{error.password.message}</p> */}

                    <label htmlFor="confirmPassword"><b>Confirm Password</b></label>
                    <input 
                        type="text" 
                        placeholder="Confirm Password*" 
                        name="confirmPassword" 
                        id="confirmPassword" 
                        onChange={handleChange}
                        // style={error.confirmPassword.error? {marginBottom:5}: {marginBottom:22}}
                        required/>
                    {/* <p className='error'>{error.confirmPassword.message}</p> */}
                    <p className='error'>{password.error}</p>
                    
                    <label htmlFor="password"><b>Current Password</b></label>
                    <input 
                        type="password" 
                        placeholder="Current Password*" 
                        name="password" 
                        id="password" 
                        onChange={handleChange}
                        // style={error.confirmPassword.error? {marginBottom:5}: {marginBottom:22}}
                        required/>

                    <button 
                    onClick={handleSubmit} 
                    type="submit" className="registerbtn">Update</button>

        </div>
    );
};

export default connect(null, {changePassAction})(Password) ;