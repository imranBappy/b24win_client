import React from 'react';
import './ScrollBar.css';
import { useLocation } from 'react-router-dom';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
const ScrollBar = (props) => {
    const location = useLocation();

    return (
       <div className="container">
            <div className="scroll-bar" >
            <ul>
                {
                    props.data.map((i, n)=>{
                        const path = i.path.split('?')
                        return(
                            <li style={props.user.isClubHolder ? {}  :  path[0] ==='/statement/club-holder'?{display: 'none'}:{} } key={i.path+n}>
                                <Link to={i.path}>
                                    <button style={path[0] ==='/statement/club'?{minWidth:130}:{}}
                                        className={location.pathname === path[0] ? 'btn-active': ''}
                                    >{i.name}</button>
                                </Link>
                            </li>
                        )
                    }
                    )
                }
            </ul>
        </div>
       </div>
    );
};
const mapStateToProps = state =>({
    user: state.auth.user
})
export default connect(mapStateToProps)(ScrollBar) ;