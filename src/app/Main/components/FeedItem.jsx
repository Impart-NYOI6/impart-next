import React, { useRef, useState, useEffect } from 'react';
import { supabase } from '../../database';
import Comment from './Comment';
import { IconButton } from '@mui/material';
import FullscreenTwoToneIcon from '@mui/icons-material/FullscreenTwoTone';


export default function FeedItem (props){
    const [twoComments, setTwoComments] = useState([]);
    const videoRef = useRef(null);
    const videoID = props.video.id;
    const postID = props.video.postID;
    const sendID = props.returnID;
   
    useEffect(()=>{
        const getTwoComments = async () => {
            const twoCommentArray = [];
            // const { data, error } = await supabase
            // .from('Comments')
            // .select('*')
            // .eq('post_id', `${postID}`);
            // .where(`${postID}`)



            data?.forEach((obj) => {
                if (obj.comment_text) {
                    twoCommentArray.push({text: obj.comment_text, user: obj.user_id})
                }
            })
            setTwoComments(twoCommentArray)

        }
        // getTwoComments();
    }, [])


    const handleClick = () => {
        if (videoRef.current) {
            videoRef.current.pause();
        }
        // Call your existing function for fullscreen or any other logic
        
        props.play(props.video.url);
        sendID(postID)
    };
    

    return (
        <div className="mb-8 bg-gray-700 text-white p-4 rounded-md w-full max-w-md">
            <div className="justify-end">
                <IconButton  aria-label="open" onClick={handleClick}>
                    <FullscreenTwoToneIcon color="primary"/>
                </IconButton>
            </div>
            <div className="flex">
                <div className="feeditem"><video ref={videoRef} controls src={props.video.url} className="video-container" /></div>
                {/* <div className="items-center justify-center"><p>Question Summary</p></div> */}
            </div>
           
            {/* <button onClick={handleClick}>FULL SCREEN</button> */}
            {/* <Comment/> */}
        </div>
    )
}

// select
//   a.name,
//   b.date_of_purchase
// from
//   customers a
//   join orders b
//     on a.id = b.customer_id
// where
//   a.sign_up_date > '2023-01-01'
//   and b.status = 'shipped'
// order by
//   b.date_of_purchase;
// limit 10


// const output = Thumbler({
//     type: 'video', 
//     input: `${props.video}`,
//     output: 'output.jpeg', 
//     time: '00:00:22',
//     size: '300x200' // this optional if null will use the desimention of the video
// }, function(err, path){
//     if (err) return err;
//     return path;
// });
