/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Table from '../Table/Table';
import columns from '../../data/clubBet';
import { connect } from 'react-redux';
import useQuery from '../../utils/useQuery';
import { useLocation} from 'react-router-dom';

const ClubHolder = (props) => {
    const query = useQuery(useLocation);
    const [bet, setBet] = useState({result:[], length: 0});
    const [club, setClub] = useState({})
    useEffect(()=>{
        console.log(111, props.club)
        if (props.club) {
            axios.get(`https://b24win.herokuapp.com/usersbet/club-bet-get?page=${query.get('page')}&club=${props.club._id}`)
            .then(function (response) {
                console.log(response.data);
                setBet(response.data)
            })
            .catch(function (error) {
            }) 
            axios.get(`https://b24win.herokuapp.com/club/${props.username}`)
            .then(function (response) {
                setClub(response.data.club)
            })
            .catch(function (error) {
            }) 
        }
        
    },[props.club])

    const active = page =>{
        axios.get(`https://b24win.herokuapp.com/usersbet/club-bet-get?page=${page}&club=${props.club.clubId}`)
        .then(function (response) {
            setBet(response.data)
        })
        .catch(function (error) {})
    }
    return (
        <div className="container">
            <div>Name: {club.name}, Id: {club.clubId} member: {club.user?club.user.length:''}, Balance: {club.balance}</div>
            <Table
                path="/club-holder"
                action={active}
                rows={bet.result}
                length={bet.length}
                columns={columns()}
            />
        </div>
    );
};
const mapStateToProps = state =>({
    club: state.auth.user.club,
    username:state.auth.user.username
});
export default connect(mapStateToProps)(ClubHolder) ;