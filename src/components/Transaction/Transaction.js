/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import columns from '../../data/trasaction';
import useQuery from '../../utils/useQuery';
import { useLocation, Link} from 'react-router-dom';
import {transitionGetAction} from '../../store/actions/transactionAction';
import Table from '../Table/Table';
import jwt_decide from 'jwt-decode';
import './Transaction.css';
const Transaction = (props) => {
    const user = jwt_decide(props.auth.token)
    const query = useQuery(useLocation);
    useEffect(()=>{
        props.transitionGetAction(query.get('page'), user._id)
    },[]);

    const action = page =>{
        props.transitionGetAction(page, user._id)
    }
    return (
        <div className="container">
            <div className="add-trnx">
                <Link to='/statement/deposit'>
                    <button>Deposit</button>
                </Link>
                <Link to='/statement/withdraw'>
                    <button>Withdraw</button>
                </Link>
            </div>
            <Table
                path="/transaction"
                action={action}
                rows={props.transition.transition}
                length={props.transition.length}
                columns={columns()}
            />
        </div>
    );
};
const mapStateToProps = (state) => ({
    auth: state.auth,
    transition: state.transaction
})
export default connect(mapStateToProps, {transitionGetAction})(Transaction);