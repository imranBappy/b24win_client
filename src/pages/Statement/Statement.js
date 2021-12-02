import React from 'react';
import ScrollBar from '../../components/ScrollBar/ScrollBar';
import Profile from '../../components/Profile/Profile';
import PrivateRoute from '../../components/PrivateRoute/PrivateRoute';
import Bet from '../../components/Bet/Bet';
import data from '../../data/statement';
import Transaction from '../../components/Transaction/Transaction';
import TransactionInput from '../../components/TransactionInput/TransactionInput';
import BalanceTransfer from '../../components/BalanceTransfer/BalanceTransfer';
import Password from '../../components/Password/Password';
import BalanceTransferFrom from '../../components/BalanceTransfer/BalanceTransferFrom';
import ChangeClub from './../../components/ChangeClub/ChangeClub';
import ClubHolder from '../../components/ClubHolder/ClubHolder';
import { connect } from 'react-redux';
const Statement = (props) => {
    return (
        <div>
            <ScrollBar data={data()}/>
            <PrivateRoute exact path='/statement' component={Profile} />
            <PrivateRoute path='/statement/bet' component={Bet} />
            <PrivateRoute path='/statement/transaction' component={Transaction} />
            <PrivateRoute path='/statement/withdraw'>
                <TransactionInput transaction ='withdraw' />
            </PrivateRoute>
            <PrivateRoute path='/statement/deposit'>
                <TransactionInput transaction ='deposit' />
            </PrivateRoute>
            <PrivateRoute path='/statement/transfer'>
                <BalanceTransfer />
            </PrivateRoute>
            <PrivateRoute path='/statement/send-transfer'>
                <BalanceTransferFrom/>
            </PrivateRoute>
            <PrivateRoute path='/statement/password'>
                <Password />
            </PrivateRoute>
            <PrivateRoute path='/statement/club'>
                <ChangeClub />
            </PrivateRoute>
            <PrivateRoute path='/statement/club-holder'>
                <ClubHolder/>
            </PrivateRoute>
        </div>
    );
};
const mapStateToProps = state =>({
    user: state.auth.user
})
export default connect(mapStateToProps)(Statement) ;