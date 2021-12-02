import React from 'react';
import './LiveGame.css';
import {connect} from 'react-redux';
import {useHistory} from 'react-router-dom';
import cricket from '../../img/cricket.png'
import football from '../../img/football.png'
import basketball from '../../img/basketball.png'
import tableTennis from '../../img/tabletennis.png';

const Game = ({game, style, classNames,  handleModel, auth}) =>{
    const history = useHistory()
    const open = (e) =>{
        if (e.target.className === 'game__logo') return 0;
        if (e.target.className.length > 9) {
            e.target.className = 'accordion'
            e.target.nextElementSibling.style = 'max-height:0'
        }else{
            e.target.className = 'accordion active'
            e.target.nextElementSibling.style = 'max-height:2500px';
        }
    }
    const handleBet=(...rest) =>{
        if (auth)  {
            handleModel(...rest)
        }else{
            history.push('/login')
        }
    }
    return (
        <div className='container'>
              {
                game.map((main)=>(
                    <div 
                    key={main._id}
                     style={{marginBottom:10, border:'none'}}>
                    <h1 onClick={open} className={`${classNames}`}>
    
                        <img className="game__logo" src={
                            main.type === "Cricket" ? cricket :
                            main.type === "TableTennis" ? tableTennis :
                            main.type === "Football"? football :  basketball
                        } alt="" /> 
                        {`${main.country1} VS ${main.country2} ${main.name} | ${main.date}`}
                    </h1>
                    <div className="panel" style={style} >
                        {
                            main.bets.map(bet=>{
                                return(
                                    <div 
                                    key={bet._id}
                                    >
                                        {bet.show&&
                                        <div className="bet">
                                            <h4> <span>{bet.title}</span> </h4>
                                            <div className="bet-container">
                                                {
                                                    bet.question && bet.question.map(q=>{
                                                        return (
                                                            <>
                                                                { <button 
                                                                    onClick={q.show ?()=>handleBet(main._id, bet._id, q._id ):()=>{} }
                                                                    key={q._id}>{q.question} 
                                                                    <span>{q.rate}</span> 
                                                                    </button>}
                                                            </>
                                                        )
                                                    }) 
                                                }
                                            </div>
                                        </div>
                                    }
                                    </div>
                                )
                            }   
                            )
                        }
                        
                    </div>
                </div>
                )
               
            )
            }
        </div>
    );
};
const mapStateToProps = (state) =>({
    auth: state.auth.isAuthenticated
})
export default connect(mapStateToProps)(Game);