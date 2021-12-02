import React from 'react';
import './LiveGame.css';
import Game from './Game';
const LiveGame = ({game, handleModel}) => {
    return (
        <>{
            game.length ? 
            <Game
                handleModel={handleModel}
                game={game}
                style={{maxHeight:2500}}
                classNames='accordion active'
            />:
            <>
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
            </>
        }
            
        </>
    );
};

export default LiveGame;