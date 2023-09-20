'use client'
import FeedItem from './components/FeedItem'
// import Button from './components/Button'
import React, { useState, useEffect } from 'react';
import { supabase } from '../database'
import Modal from 'react-modal';
import ReactPlayer from "react-player";



export default function() {
    const [categories, setCategories] = useState([]);
    const [videos, setVideos] = useState([]);
    // const [videoComments, setVideoComments] = useState([])
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        const getVideos = async () => {
            const videoArray = [];
            
            const { data, error } = await supabase
            .from('Posts')
            .select('*');
            data?.forEach((obj) => {
                if (obj.video_hosted_url) {
                  // console.log('obj.post_id: ', obj.post_id)
                    videoArray.push({url: obj.video_hosted_url, id: obj.id, postID: obj.post_id})
                }
            })
            // console.log(videoArray)
            setVideos(videoArray)

        }
        getVideos();
    }, [categories])

    const handleWatchNow = (movie) => {
        setSelectedMovie(movie);
        setModalIsOpen(true);
      };

    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedMovie(null);
      };


    
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
                <div className="border-4 border-blue-500 rounded mx-auto space-y-5">
                    VIDEO LIST HERE
                    {/* map videos array to FeedItem here */}
                    {videos.map((video)=>{return <FeedItem video={video} play={(url)=>{handleWatchNow(url)}}/>})}
                </div>
            </div>
            <div>
            <button
                  className='btn btn-warning w-100 fw-bold'
                  onClick={() => handleWatchNow('https://impart-video-storage-1.s3.amazonaws.com/data_encrypting%20%28720p%29.mp4')}
                >
                  {" "}
                  Watch Now
                </button>
              </div>

            <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel='Video Modal'
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
          },
          content: {
            width: "850px",
            height: "85vh",
            margin: "auto", // Center the modal horizontally
            padding: "0px",
            border: "none",
            overflow: "hidden",
          },
        }}
      >
        {/* selectedMovie = movie */}

        {selectedMovie && (
            <div>
            <ReactPlayer
              url={selectedMovie}
              height='50vh'
              width='850px'
              controls={true}
              className='bg-dark overflow-hidden'
            />
          <div>Responses</div>
          </div>
        )}
      </Modal>




        </div>
    )
}