/* eslint-disable react-hooks/exhaustive-deps */
import React, {  useEffect, useState } from 'react';
import {connect} from 'react-redux'
import {balanceTransferPostAction} from '../../store/actions/balanceTransferAction';
const BalanceTransferFrom = (props) => {
    const [transfer, setTransfer] = useState({
        amount: 100,
        to:'',
        message: ''
    });
    const user = props.auth.user
    useEffect(() =>{ 
        if(user.balance < 100) setTransfer({...transfer, message:'There is not enough balance'})
     },[])
    const handelChange = e =>{
        const name = e.target.name, value = e.target.value;
        let number
        if(Number(value)) number = typeof Number(value)          
        if(number === 'number' || value === ''){
            if(user.balance >= Number(value)) {
                setTransfer({...transfer, [name]: value, message:''});
            }else{
                setTransfer({...transfer,[name]: value, message:'There is not enough balance'})
            }
            if (!(Number(value)>= 100)) setTransfer({...transfer, [name]: value, message:'You can bet at least 100 Taka'})
        }else{
            setTransfer({...transfer, [name]: value, message:''});
        }
    }
    const handleSubmit = () =>{
        if (!transfer.message) {
            console.log(transfer);
            props.balanceTransferPostAction({
                amount: Number(transfer.amount),
                to: transfer.to
            })
        }
    }
    return (
        <div className='container'>
           
                <>
                    <label htmlFor="bet">Enter You Amount</label>
                    <input 
                        onChange={handelChange} 
                        placeholder='Please Enter you Number' 
                        name='amount'
                        value={transfer.amount} 
                        type="text" 
                    />
                    {
                        transfer.message && <p className='error' >{transfer.message}</p>
                    }
                    <input 
                        onChange={handelChange} 
                        placeholder='Enter you username' 
                        name='to'
                        value={transfer.to} 
                        type="text" 
                    />
                    <button onClick={handleSubmit} >Send </button>

                </>
            
            
        </div>
    );
};
const mapStateToProps = state =>({
    auth: state.auth
})
export default connect(mapStateToProps,{balanceTransferPostAction})(BalanceTransferFrom) ;