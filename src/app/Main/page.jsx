'use client'
import FeedItem from './components/FeedItem'
// import Button from './components/Button'
import React, { useState, useEffect } from 'react';
import { supabase } from '../database'

export default function() {
    const [categories, setCategories] = useState([]);
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const getVideos = async () => {
            const videoArray = [];
            const { data, error } = await supabase
            .from('Posts')
            .select('*');
            data?.forEach((obj) => {
                if (obj.video_hosted_url) {
                    videoArray.push(obj.video_hosted_url)
                }
            })
            console.log(videoArray)
            setVideos(videoArray)

        }
        getVideos();
        
    }, [categories])
    
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
                    {/* map videos array to FeedItem here */}
                    {videos.map((video)=>{return <FeedItem video={video}/>})}
                </div>
            </div>
        </div>
    )
}