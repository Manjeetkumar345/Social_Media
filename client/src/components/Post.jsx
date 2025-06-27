import React, { useState } from 'react'
import img from "../Images/Status.png"
import ProfilePost from './mini/ProfilePost'

export default function Post() {
  const [postModal, setPostModal] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(null)
  
  const openPostModal = (index) => {
    setSelectedIndex(index)
    setPostModal(true)
  }
  
  const closePostModal = () => {
    setPostModal(false)
  }

  return (
    <div className="w-full min-h-screen p-4 overflow-x-hidden">
      <div className="w-full max-w-[calc(100vw-171px)] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
          {[...Array(6)].map((_, index) => (
            <div 
              key={index}
              className="relative aspect-square bg-black text-white overflow-hidden cursor-pointer"
            >
              <img 
                src={img} 
                alt="Post" 
                className="w-full h-full object-cover"
                onClick={() => openPostModal(index)}
              />
            </div>
          ))}
        </div>
      </div>
      
      {/* Render modal outside the grid */}
      {postModal && (
        <ProfilePost 
          onClose={closePostModal} 
          postIndex={selectedIndex}
        />
      )}
    </div>
  )
}