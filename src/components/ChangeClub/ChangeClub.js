/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { clubAction, clubUpdateAction } from './../../store/actions/clubAction';

const ChangeClub = (props) => {
    const [club, setClub] = useState('')
    const handleChange = e =>{
        setClub(e.target.value);
    }
    useEffect(()=>{
        props.clubAction()
    },[])
    const handleSubmit = () =>{
        props.clubUpdateAction(club)
    }
    return (
        <div className="container">
             <label htmlFor="club"><b>Select Club</b></label>
                <select onChange={handleChange} name="club"  id="club" >
                    <option value="">Select Club*</option>
                        {
                            props.club.map(club=>(
                                <option key={club._id} value={club._id}>{club.name}</option>
                            ))
                        }
                </select>
                <button onClick={handleSubmit} type="submit" className="registerbtn">Update Club</button>

        </div>
    );
};
const mapStateToProps = state =>({
    club: state.club.club
})
export default connect(mapStateToProps, {clubAction, clubUpdateAction})(ChangeClub);