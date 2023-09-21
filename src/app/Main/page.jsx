'use client';
import FeedItem from './components/FeedItem'
// import Button from './components/Button'
import React, { useState, useEffect } from 'react';
import { supabase } from '../database'
import Modal from 'react-modal';
import ReactPlayer from "react-player";
import Comment from './components/Comment';
// import fetch from 'node-fetch';
// Modal.setAppElement(el);
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Dropdown from './components/dropdowns/bothDropdowns'



export default function() {
    const [videos, setVideos] = useState([]);
    // const [videoComments, setVideoComments] = useState([])
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [commentArray, setCommentArray] = useState([])
    const [selectedMovieID, setSelectedMovieID] = useState(null);
    const [categories, setCategories] = useState([]);
    const [industries, setIndustries] = useState([]);

    useEffect(() => {
      const getVideos = async () => {
        const videoArray = [];

        const body = {
          industries: industries,
          categories: categories
        };

        if (categories.length === 0 && industries.length === 0) {
          const response = await fetch('https://impart-server.onrender.com/posts');

          const data = await response.json();

          console.log('data: ', data);

          data?.forEach((obj) => {
            if (obj.video_hosted_url) {
  
                videoArray.push({url: obj.video_hosted_url, id: obj.id, postID: obj.post_id})
            }
          })
          setVideos(videoArray)
        } else {
          const response = await fetch('https://impart-server.onrender.com/getPostsByCriteria', {
            method: 'post',
            body: JSON.stringify(body),
            headers: {'Content-Type': 'application/json'}
          });
  
          const data = await response.json();

          data?.forEach((obj) => {
            if (obj.video_hosted_url) {
              // console.log('obj.post_id: ', obj.post_id)
                videoArray.push({url: obj.video_hosted_url, id: obj.id, postID: obj.post_id})
            }
          })
  
          setVideos(videoArray)
        }
       
        
        
      };
      
      getVideos();
        // const getVideos = async () => {
        //       // /getPostsByCriteria
        //       // {
        //       //     "industries" : ["Software & IT Services","Retail"],
        //       //     "categories" : ["Career Development"]
        //       // }
        //     const videoArray = [];
            
        //     const { data, error } = await supabase
        //     .from('Posts')
        //     .select('*');
        //     data?.forEach((obj) => {
        //         if (obj.video_hosted_url) {
        //           // console.log('obj.post_id: ', obj.post_id)
        //             videoArray.push({url: obj.video_hosted_url, id: obj.id, postID: obj.post_id})
        //         }
        //     })
        //     // console.log(videoArray)
        //     setVideos(videoArray)

        // }
        // getVideos();
    }, [categories, industries])

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

    const handleWatchNow = (movie) => {
        setSelectedMovie(movie);
        setModalIsOpen(true);
      };

    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedMovie(null);
        setCommentArray([]);
      };

    const Item = styled(Paper)(({ theme }) => ({
      backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
      ...theme.typography.body2,
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    }));
      

    
    return (
        <div className="flex flex-col items-center mt-10 min-h-screen">
            <div>Impartables</div>
            <div className="flex justify-between w-full">
                <div className="flex-col ml-4">
                    <Dropdown inds={industries} cats={categories} categories={(catArr)=>{setCategories(catArr)}} industries={(indArr)=>{setIndustries(indArr)}}/>
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
            <h2>Comments</h2>
            {/* {commentArray.map((comment) =>{return <Comment comment={comment.comment_text} />})} */}
            <Box sx={{ width: '100%' }}>
              <Stack spacing={2}>
              {commentArray.map((comment) =>{return <Item>{comment.comment_text}</Item>})}
              </Stack>
            </Box>

          </div>
          </div>
        )}
  </Modal>




        </div>
    )
}