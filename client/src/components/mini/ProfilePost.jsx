import React, { useState } from 'react';
import img from "../../Images/Status.png";
import CloseIcon from '@mui/icons-material/Close';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
// import ModeCommentIcon from '@mui/icons-material/ModeComment';
import SendIcon from '@mui/icons-material/Send';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';

const ProfilePost = ({ onClose,updateProfile }) => {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [dofollow ,setFollow] = useState(false)
  const handleFollow = ()=>{
    setFollow(!dofollow);
  }
  return (
    <div className='fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex justify-center items-center z-50 p-4'>
      {/* Floating Close Button */}
      <button 
        onClick={onClose}
        className='absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-1 z-10 outline-none focus:outline-none'
      >
        <CloseIcon />
      </button>
      
      {/* Content Container */}
      <div className='bg-gray-800 rounded-lg overflow-hidden w-full max-w-5xl max-h-[90vh] flex'>
        {/* Image */}
        <div className='w-2/3 bg-black flex items-center justify-center'>
          <img 
            src={img} 
            className='max-h-[80vh] object-contain w-full'
            alt="Post"
          />
        </div>
        
        {/* Details Panel */}
        <div className='w-1/3 flex flex-col bg-gray-800'>
          {/* User Info */}
          <div className='flex items-center p-3 border-b border-gray-700'>
            <img 
              src={img} 
              className='w-8 h-8 rounded-full object-cover mr-2'
              alt="Profile"
            />
            <span className='font-medium text-white'>Profile Name</span>
            <button className='ml-auto text-gray-500 outline-none focus:outline-none'>⋯</button>
          </div>
          
          {/* Caption & Comments */}
          <div className='flex-1 overflow-y-auto p-4 space-y-4 bg-gray-600'>
            <div className='flex'>
              <img 
                src={img} 
                className='w-8 h-8 rounded-full object-cover mr-2 flex-shrink-0'
                alt="Profile"
              />
              <div className='text-white'>
                <div className='font-medium'>Profile Name</div>
                <p>This is the post caption. Lorem ipsum dolor sit amet.</p>
              </div>
            </div>
            
            {[...Array(5)].map((_, i) => (
              <div key={i} className='flex'>
                <img 
                  src={img} 
                  className='w-8 h-8 rounded-full object-cover mr-2 flex-shrink-0'
                  alt="Commenter"
                />
                <div className='text-white'>
                  <div className='font-medium'>Commenter {i+1}</div>
                  <p>This is a sample comment on the post.</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Actions */}
          <div className='p-3 border-t border-gray-700 bg-gray-800'>
            <div className='flex justify-between mb-2'>
              <div className='flex space-x-3'>
                {/* Like button */}
                <button 
                  onClick={() => setLiked(!liked)}
                  className='bg-transparent p-0 outline-none focus:outline-none'
                >
                  {liked ? 
                    <FavoriteIcon className='text-red-500' /> : 
                    <FavoriteBorderIcon className='text-white' />
                  }
                </button>
                
                
                {/* Share button */}
                <button className='bg-transparent p-0 outline-none focus:outline-none'>
                  <SendIcon className='text-white' />
                </button>

                {/* Follow  button */}
                {dofollow ? <button className='bg-purple-700 p-1 outline-none focus:outline-none w-24'
                onClick={handleFollow}
                >
                  follow 
                </button> : <button className='bg-purple-700 p-1 outline-none focus:outline-none w-24'
                onClick={handleFollow}
                >
                  following 
                </button>
                }
              </div>
              
              {/* Save button */}
              <button 
                onClick={() => setSaved(!saved)}
                className='bg-transparent p-0 outline-none focus:outline-none'
              >
                {saved ? 
                  <BookmarkIcon className='text-yellow-500' /> : 
                  <BookmarkBorderIcon className='text-white' />
                }
              </button>
            </div>
            
            <div className='text-sm font-semibold text-white'>1,243 likes</div>
            <div className='text-xs text-gray-400'>2 hours ago</div>
            
            {/* Add comment */}
            <div className='flex mt-2'>
              <input 
                type="text" 
                placeholder='Add a comment...'
                className='flex-1 p-1 text-sm border-b border-gray-600 bg-transparent text-white focus:outline-none placeholder-gray-400'
              />
              <button className='text-blue-400 font-semibold text-sm ml-2 outline-none focus:outline-none'>
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePost;