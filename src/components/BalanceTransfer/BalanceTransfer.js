/* eslint-disable react-hooks/exhaustive-deps */
import React,{useEffect} from 'react';
import {connect} from 'react-redux'
import {balanceTransferGetAction} from '../../store/actions/balanceTransferAction';
import { useLocation, Link} from 'react-router-dom';
import useQuery from '../../utils/useQuery';
import Table from '../Table/Table';
import columns from '../../data/transfer';

const BalanceTransfer = (props) => {
    const query = useQuery(useLocation);
    useEffect(() =>{
        props.balanceTransferGetAction(query.get('page'))
    },[])
    return (
        <div className="container">
            <div className="add-trnx">
                <Link to='/statement/send-transfer'>
                    <button>Send Transfer</button>
                </Link>
            </div>
            <Table
                path="/transfer"
                action={props.balanceTransferGetAction}
                rows={props.transfer.transfer}
                length={props.transfer.length}
                columns={columns()}
            />
        </div>
    );
};
const mapStateToProps = (state) => ({
    transfer: state.transfer
})
export default connect(mapStateToProps, {balanceTransferGetAction})(BalanceTransfer) ;
