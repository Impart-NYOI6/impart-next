'use client'
import FeedItem from './components/FeedItem'
// import Button from './components/Button'
import React, { useState, useEffect } from 'react';
import { supabase } from '../database'
import Modal from 'react-modal';
import ReactPlayer from "react-player";
import Comment from './components/Comment';
// import fetch from 'node-fetch';
// Modal.setAppElement(el);



export default function() {
    const [categories, setCategories] = useState([]);
    const [videos, setVideos] = useState([]);
    // const [videoComments, setVideoComments] = useState([])
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [commentArray, setCommentArray] = useState([])
    const [selectedMovieID, setSelectedMovieID] = useState(null);

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

    useEffect(() => {

      const getComments = async () => {
        const body = {posts: [`${selectedMovieID}`]};
       
        const response = await fetch('https://impart-server.onrender.com/getComments', {
          method: 'post',
          body: JSON.stringify(body),
          headers: {'Content-Type': 'application/json'}
        });
        const data = await response.json();

        console.log('data: ', data);
        setCommentArray(data)
      };
      
      getComments();
    }, [selectedMovieID])


    // const getComments = async () => {
    //   const body = {posts: `${selectedMovieID}`};
    //   console.log('body: ', body)
    // // const response = await fetch('https://impart-server.onrender.com/getComments', {
    // //   method: 'post',
    // //   body: JSON.stringify(body),
    // //   // headers: {'Content-Type': 'application/json'}
    // // });
    // // const data = await response.json();

    // // console.log('data: ', data);
    // };
    
    // getComments();

    const handleWatchNow = (movie) => {
        setSelectedMovie(movie);
        setModalIsOpen(true);
      };

    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedMovie(null);
        setCommentArray([]);
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
                    {videos.map((video)=>{return <FeedItem video={video} play={(url)=>{handleWatchNow(url)}} returnID={(id)=>{setSelectedMovieID(id)}} />})}
                </div>
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
          <div className="text-black">
            Responses
            {commentArray.map((comment) =>{return <Comment comment={comment.comment_text} />})}

          </div>
          </div>
        )}
  </Modal>




        </div>
    )
}