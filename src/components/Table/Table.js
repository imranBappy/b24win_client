/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import  './Table.css';
import useQuery from '../../utils/useQuery';
import { useLocation, useHistory} from 'react-router-dom';
const Table = ({columns, rows, action, path, length}) => {
    const query = useQuery(useLocation);
    const history = useHistory()
    const [page, setPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0)
    useEffect(()=>{
        if (query.get('page')){
            setPage(Number(query.get('page')));
            setTotalPage(Number(query.get('page')))
            if (rows.length === 5) {
                setTotalPage((page+1)*5)
            }else{
                setTotalPage((page*5)+rows.length)
            }
        }
    },[rows]);
    
    const handlePage = (type) =>{
        if (type==='next') {
            if (totalPage !== length) {
                setPage(Number(page) + 1);
                history.push(`/statement${path}?page=${Number(page) + 1}`);
                action(Number(page) + 1)
            }
        }else{
            if (page){
                setPage(Number(page) - 1)
                history.push(`/statement${path}?page=${Number(page) - 1}`);
                action(Number(page) - 1)
            }
        }
    };
    return (
        <>
            {length ? 
            <div className="table">
                <table>
                    <tr>
                        {
                            columns.map(column =>(
                                <th 
                                style={{minWidth:column.minWidth}} 
                                >{column.label}</th>
                            ))
                        }
                    </tr>
                    {
                        rows.map((row) =>{
                            return (
                                <tr>
                                    {
                                        columns.map(column =>{
                                            const value = row[column.id]
                                            return (<td>{
                                                column.id === 'createdAt' ? new Date(value).toLocaleString():
                                                column.id === 'name' && path === '/transfer' ? row.to.name:
                                                column.id === 'username' && path === '/transfer' ? row.to.username:
                                                column.id === 'username' && path === '/club-holder' ? row.user.username:
                                                column.id === 'status' && path ==='/club-holder' ? row.result.status  :
                                                column.id === 'game' ? value.name :
                                                column.id === 'bet' ? value.title :
                                                column.id === 'wining' ? row.amount * row.rate :
                                                column.id === 'result' ? value.question :
                                                column.id === 'rate' ?row.rate :
                                                column.id === 'status' && path ==='/bet' ? row.result.status  :
                                                value
                                                
                                                }</td>)
                                        })
                                    }
                                </tr>
                            )
                        })
                    }
                    <tr>
                        <td colspan={columns.length} className="pagination-td">
                        <div className='pagination'>
                    <div>
                        <p className='page'>{page+1}-5 of 9</p>
                    </div>
                    <div>
                        <button 
                        style={page===0 ? {opacity:.7}: {opacity:1}}
                        onClick={()=>handlePage('previous')}
                        className="previous">Previous</button>
                     </div>
                        <div>
                            <button 
                            style={totalPage=== length ? {opacity:.7}: {opacity:1}}
                            onClick={()=>handlePage('next')}
                            className="next">Next</button>
                        </div>  
                        </div>
                    </td>
                    </tr>
                </table>
               
            </div>
            :
                <h1 style={{ textAlign: 'center', color:'gray'}} >Data Not Found</h1>
            }
        </>
    );
};

export default Table;