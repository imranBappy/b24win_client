/* eslint-disable jsx-a11y/no-distracting-elements */
import React from 'react';
import './News.css';
import { useState } from 'react';
import { useEffect } from 'react';
import  axios  from 'axios';

const News = () => {
    const [news, setNews] = useState('')
    useEffect(()=>{
        axios.get('https://b24win.herokuapp.com/option/news')
        .then(res =>res)
        .then(data=>{
            if (data.data.data) {
            setNews(data.data.data.news)
                
            }
        })
    },[])
    return (
        <>
        <div >
            <div className="container x">
                <div className="news">
                    <div className="left">
                        <h3>{'news'.toLocaleUpperCase()}</h3>
                    </div>
                    <div className="right">
                        <marquee direction="left">
                            {news}
                        </marquee>
                    </div>
                </div>
            </div>
         </div>
        </>
    );
};

export default News;