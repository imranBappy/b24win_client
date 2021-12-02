/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import LiveEffect from '../../components/LiveEffect/LiveEffect';
import LiveGame from '../../components/Game/LiveGame';
import UpcomingGame from '../../components/Game/UpcomingGame';
import News from '../../components/News/News';
import {allGameGetAction} from '../../store/actions/gameAction';
import { connect } from 'react-redux';
import './home.css';
import { BetContext, ModalContext } from '../../components/Layout/Layout';
import Category from '../../components/Category/Category';
import { getAnalytics, logEvent } from "firebase/analytics";
import '../../../firebase';
const Home = (props) => {
    const [live, setLive] = useState([]);
    const [upcoming, setUpcoming] = useState([]);
    const [, setOpen] = useContext(ModalContext);
    const [Bet, setBet] = useContext(BetContext)
    useEffect(()=>{
        props.allGameGetAction()
        setInterval(() => {
            props.allGameGetAction()
        }, 3000);

        const analytics = getAnalytics();
        logEvent(analytics, 'notification_received');
        logEvent(analytics, 'select_content', {
        content_type: 'image',
        content_id: 'P12453',
        items: [{ name: 'Kittens' }]
        })
       
    },[]);
    useEffect(()=>{
        const liveGame = props.game.filter(game => game.status === 'Live')
        setLive(liveGame)
        const upcomingGame = props.game.filter(game => game.status === 'Upcoming');
        setUpcoming(upcomingGame);
    },[props.game]);
    const handleModel =(game, bet,result)=>{
        setBet({...Bet, game, bet,result })
        setOpen({display: 'block', component:'bet'})
    }
    return (
        <>
                <div className="home">
                    <div className='home-controller'>
                        <News/>
                        <Category/>
                        <LiveEffect/>
                        <LiveGame handleModel={handleModel} game={live} />
                        <div className="container">
                           <div style={{padding:'13px 0px'}}>
                                <span className='upcoming-text'>Upcoming</span>
                           </div>
                        </div>
                        <UpcomingGame handleModel={handleModel} game={upcoming} />
                    </div>
                </div>
        </>
    );
};
const mapStateToProps = (state)=>({
    game: state.game.game
})
export default connect(mapStateToProps, {allGameGetAction})(Home);
