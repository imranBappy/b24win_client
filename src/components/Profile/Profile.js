import React from 'react';
import userAbater from '../../img/dddd.jpg';
import {connect} from 'react-redux';
import {logoutAction} from '../../store/actions/authAction';
import './Profile.css'
const Profile = (props) => {
    const {profile} = props
    return (
        <div className="container">
            <div className="card">
                <img src={userAbater} alt="profile-pic" style={{with: '80%', borderRadius:'50%'}}/>
                <h1>{profile.name} <span style={{fontSize:20}} >({profile.username})</span> </h1>
                <p className="title">{profile.isClubHolder ? 'Club Holder' : 'Normal User'}</p>
                <p>Balance: {profile.balance}</p>
                <p> {profile.phone}</p>
                <p> {profile.email}</p>
                <p> {profile.sName? `${profile.sName.name} ( ${profile.sName.username} ) `  : 'sName: null'} </p>
                <p> {profile.club? `${profile.club.name} ( ${profile.club.clubId} ) `  : 'Club: null'}</p>

                <p><button style={{border:'2px solid #7f27b9 '}} onClick={props.logoutAction} >Logout</button></p>
            </div>
        </div>
    );
};
const mapStateToProps = state =>({
    profile: state.auth.user
})
export default connect(mapStateToProps,{logoutAction})(Profile);