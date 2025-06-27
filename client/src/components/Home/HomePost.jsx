import React ,{ useEffect, useState } from 'react'
import img from "../../Images/Status.png"
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite'; // when Liked
import SendIcon from '@mui/icons-material/Send';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {PostSetting,PostShare} from './PostSetting';

const HomePost = () => {
    const [showModal ,setShowModal] = useState(false)
    const [shareModal,setShareModal] = useState(false)
    const [liked,setLiked] = useState(false)
    const [likes,setLikes] = useState(0)

    const handleClick = ()=>{
        if(liked) setLikes(prev => prev-1)
        else setLikes(prev => prev+1);
        setLiked(!liked)
    }

  return (
    <div className='h-[480px] w-[400px] bg-white m-1 text-black text-[10px]'>
            <div className="h-6 flex items-center justify-between p-1">
            <div className="flex items-center">
                <img src={img} alt="" className="h-5 w-5 rounded-[50%]" />
                <span className="ml-2">Follower Name</span>
            </div>
            <MoreHorizIcon onClick={()=> setShowModal(true)}/>
            {showModal &&<PostSetting onClose={()=> setShowModal(false)}/>}
            </div>

            <img src={img} alt="" className="mt-1 h-[340px]"/>
            <div className=' mt-2 h-[30px] text-gray-600'>
                {liked ? 
                    <FavoriteIcon 
                    className='mr-2 text-red-600 '
                    onClick={handleClick}/>:
                    <FavoriteBorderIcon
                     className='mr-2 hover:text-gray-500' 
                     onClick={handleClick}/> 
                }
                <SendIcon className='mr-2'
                    onClick={()=>setShareModal(true)}
                />
                {shareModal && <PostShare onClose={()=>setShareModal(false)}/>}

                <ModeCommentIcon className='mr-2'/>
            </div>
            <ul className='pl-1 text-black'>
                <li>{likes} likes</li>
                <li>Following Name</li>
                <li>             <div className='flex mt-2'>
              <input 
                type="text" 
                placeholder='Add a comment...'
                className='flex-1 p-1 text-sm border-b border-gray-600 bg-transparent text-white focus:outline-none placeholder-gray-400'
              />
            </div>
                </li>
            </ul>               
            </div>
  )
}



export default HomePost
