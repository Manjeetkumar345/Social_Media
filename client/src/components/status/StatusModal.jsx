import React, { useState, useEffect } from 'react';
import img from "../../Images/Status.png";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';

const StatusModal = ({ onClose, statusIndex }) => {
  const [liked, setLiked] = useState(false);
  const [currentStatusIndex, setCurrentStatusIndex] = useState(statusIndex || 0);
  const totalStatuses = 15;
  
  // Auto-advance status every 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentStatusIndex(prev => (prev + 1) % totalStatuses);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [currentStatusIndex]);

  const handleNext = () => {
    setCurrentStatusIndex(prev => (prev + 1) % totalStatuses);
  }

  const handlePrev = () => {
    setCurrentStatusIndex(prev => (prev - 1 + totalStatuses) % totalStatuses);
  }

  return (
    <div className='fixed inset-0 bg-black bg-opacity-90 backdrop-blur-sm flex justify-center items-center z-50'>
      <div className='relative w-full max-w-md h-[90vh]'>
        {/* Progress bars */}
        <div className='absolute top-4 left-4 right-4 flex gap-1 z-10'>
          {[...Array(totalStatuses)].map((_, i) => (
            <div 
              key={i}
              className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                i === currentStatusIndex 
                  ? 'bg-white' 
                  : i < currentStatusIndex 
                    ? 'bg-gray-500' 
                    : 'bg-gray-700'
              }`}
            />
          ))}
        </div>
        
        {/* Close button */}
        <button 
          onClick={onClose}
          className='absolute top-5 right-5 z-10 text-white'
        >
          <CloseIcon />
        </button>
        
        {/* Status content */}
        <div className='relative h-full'>
          <img 
            src={img} 
            alt={`Status ${currentStatusIndex + 1}`}
            className='w-full h-full object-contain'
          />
          
          {/* Navigation arrows */}
          <div className='absolute inset-0 flex justify-between items-center'>
            <div 
              className='h-full w-1/3 cursor-pointer'
              onClick={handlePrev}
            ></div>
            <div 
              className='h-full w-1/3 cursor-pointer'
              onClick={handleNext}
            ></div>
          </div>
          
          {/* User info */}
          <div className='absolute top-5 left-5 flex items-center z-10'>
            <img 
              src={img} 
              alt="Profile"
              className='w-8 h-8 rounded-full mr-2 border-2 border-purple-500'
            />
            <span className='text-white font-medium'>User_{currentStatusIndex + 1}</span>
          </div>
          
          {/* Comment input */}
          <div className='absolute bottom-5 left-0 right-0 px-4'>
            <div className='flex items-center bg-black bg-opacity-50 rounded-full p-2'>
              <input
                type="text"
                placeholder='Send message'
                className='flex-1 bg-transparent text-white px-2 focus:outline-none placeholder-gray-300'
              />
              <button 
                onClick={() => setLiked(!liked)}
                className='p-1 mx-1'
              >
                {liked ? 
                  <FavoriteIcon className='text-red-500' /> : 
                  <FavoriteBorderIcon className='text-white' />
                }
              </button>
              <button className='p-1'>
                <SendIcon className='text-white' />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusModal;