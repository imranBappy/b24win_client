import React from 'react';
import { connect } from 'react-redux';
import { alertAction } from '../../store/actions/alertAction';
import './Alert.css';

const Alert = (props) => {
    const {message, error} = props.alert
    const checkAlert = () =>{
        props.alertAction({
            message:'',
            error: false
        })
    }
    return (
        <div>
            <div  style={error?{color:'red', background:'red', margin:"10px 0px"}:{color:'green', background:'green', margin:"10px 0px"}} className="alert">
                <span className="closebtn" onClick={checkAlert} >&times;</span> 
                {message}
            </div>
        </div>
    );
};

const mapStateToProps = state =>({
    alert: state.alert
})

export default connect(mapStateToProps,{alertAction})(Alert) ;