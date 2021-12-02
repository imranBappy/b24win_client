import React, { useContext } from 'react';

import './Category.css';
import cricket from '../../img/cricket.png'
import football from '../../img/football.png'
import basketball from '../../img/basketball.png'
import dart from '../../img/dart.png'
import beach_volley from '../../img/beach_volley.png'
import all from '../../img/logo.png'

import tableTennis from '../../img/tabletennis.png';
import { connect } from 'react-redux';
import { allGameGetAction } from './../../store/actions/gameAction';
import { MenuContext, } from '../Layout/Layout';


const Category = (props) => {
    const [menu] = useContext(MenuContext)

    // function scrollWin(e) {
    //     const ul = document.querySelector('.scroll')
    //     ul.scrollLeft = e ? ul.scrollLeft - 130 :  ul.scrollLeft + 130
    //   }

      const handleGame = (type = '0') =>{
        props.allGameGetAction(type)
      }
    return (
       <div className="container">
           
            <div className="scroll-bar scroll" >

            {!menu &&<>
            {/* <div className="left_arrow arrow_s" onClick={()=>scrollWin('left')}>
           {'<'}
           </div>
           <div className="right_arrow arrow_s" onClick={()=>scrollWin()}>
           {'>'}
           </div> */}
           </>
           }

            <ul>
                <li> 
                    <img src={all} alt="cricket" onClick={()=>handleGame("0")}/>
                    <p>All</p>
                </li>
                <li onClick={()=>handleGame("Cricket")} > 
                    <img src={cricket} alt="cricket" />
                    <p>Cricket</p>
                </li>
                <li onClick={()=>handleGame("Football")} > 
                    <img src={football} alt="cricket" />
                    <p>Football</p>
                </li>
                <li onClick={()=>handleGame("Basketball")}> 
                    <img src={basketball} alt="cricket" />
                    <p>Basketball</p>
                </li>
                <li onClick={()=>handleGame("TableTennis")}> 
                    <img src={tableTennis} alt="cricket" />
                    <p>TableTennis</p>
                </li>
                
                <li> 
                    <img src={dart} alt="cricket" />
                    <p>Darts</p>
                </li>
                <li> 
                    <img src={beach_volley} alt="cricket" />
                    <p>Beach Volley</p>
                </li>
                
            </ul>
        </div>
       </div>
    );
};
const mapStateToProps = (state) =>({
    game: state.game.game,
})
export default connect(mapStateToProps,{allGameGetAction})(Category)  ;