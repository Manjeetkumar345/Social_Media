import React, { useState } from 'react';
import img from "../../Images/Status.png";
import StatusModal from './StatusModal';

const Status = () => {
  const [statusIndex, setStatusIndex] = useState(null);
  const [statusModal, setStatusModal] = useState(false);
  const statusPresent = true; // Assuming status is always present

  const user = JSON.parse( localStorage.getItem('user'));
  // console.log("UserNamewa",user.username)

  const openStatus = (index) => {
    setStatusIndex(index);
    setStatusModal(true);
  }
  const BASE_URL = "http://localhost:8000";
  return (
    <>
      <div className="flex overflow-x-auto pb-2 space-x-4 px-4 hide-scrollbar">
        <style>
          {`.hide-scrollbar::-webkit-scrollbar { display: none }
            .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none }`}
        </style>
        
        {statusPresent && [...Array(15)].map((_, i) => (
          <div key={i} className='text-center flex-shrink-0 cursor-pointer'>
            <div 
              className="border-2 rounded-full border-purple-500 p-1 mx-3"
              onClick={() => openStatus(i)}
            >
              <img 
                src={`${BASE_URL}${user.profilePhoto}`||img} 
                alt="status" 
                className='h-[70px] w-[70px] rounded-full object-cover'
              />
            </div>
            <span className='text-sm mt-1 block truncate w-20 mx-auto'>
              {i === 0 ? `${user.username}` : `Follower ${i}`}
            </span>
          </div>
        ))}
      </div>
      
      {statusModal && (
        <StatusModal 
          onClose={() => setStatusModal(false)}
          statusIndex={statusIndex}
        />
      )}
    </>
  );
};

export default Status;