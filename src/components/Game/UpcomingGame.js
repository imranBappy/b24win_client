import React from 'react';
import {connect} from 'react-redux';
import Game from './Game';
const UpcomingGame = (props) => {
    return (
        <>
           {
            props.game.length ? 
            <Game
            handleModel={props.handleModel}
                game={props.game}
                style={{}}
                classNames='accordion'
            />:
            <>
            <div className="animation__container container">
              <div className="header__animation">
                  <div className="logo__animation skeletor">

                  </div>
                  <div className="title__animation skeletor">
                      
                  </div>
              </div>
              <div className="header__body">
              <h4 className="bet__title__animation skeletor">  </h4>
              <div className="btn__animation__container">
                  <div className="skeletor">
                  </div>
                  <div className="skeletor">
                  </div>
              </div>
              </div>
          </div>
         <br />
            </>
        }
        </>
    );
};

export default connect()(UpcomingGame) ;