'use client'
import FeedItem from './components/FeedItem'
// import Button from './components/Button'
import React, { useState, useEffect } from 'react';

export default function() {
    const [categories, setCategories] = useState([]);

    useEffect(()=>{
        //fetch from server here
    },[categories])
    
    return (
        <div className="flex flex-col items-center mt-10 min-h-screen">
            <div>TITLE</div>
            <div className="flex justify-between w-full">
                <div className="flex-col ml-4">
                    <a className="block"><button>Click!</button></a>
                    <a className="block"><button>Click!</button></a>
                    <a className="block"><button>Click!</button></a>
                    <a className="block"><button>Click!</button></a>
                </div>
                <div className="mx-auto">
                    VIDEO LIST HERE
                    <FeedItem/>
                </div>
            </div>
        </div>
    )
}