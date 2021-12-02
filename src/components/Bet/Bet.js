/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import Table from '../Table/Table';
import columns from '../../data/bet';
import useQuery from '../../utils/useQuery';
import { useLocation} from 'react-router-dom';
import { connect } from 'react-redux';
import {betGetAction} from '../../store/actions/betAction';
const Bet = (props) => {
    const query = useQuery(useLocation);
    useEffect(() =>{
        props.betGetAction(query.get('page'))
    },[])
    return (
        <div  className="container">
            <Table
                path="/bet"
                action={props.betGetAction}
                rows={props.bet.bet}
                length={props.bet.length}
                columns={columns()}
            />
        </div>
    );
};
const mapStateToProps = state =>({bet: state.bet})
export default connect(mapStateToProps, {betGetAction})(Bet);