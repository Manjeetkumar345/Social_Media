import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import img from "../../Images/Status.png"


export const PostSetting = ({onClose}) => {
  return (
    <div className='fixed inset-0 bg-opacity-30 backdrop-blur-sm flex justify-center  items-center'>
      <div className=' bg-white  w-[250px] pb-3'>
        <div className='text-right'
        onClick={onClose}><CloseIcon className='text-sm'/></div>
        <ul className=''>
          <li className='border-b-[1px] border-t-[1px] border-gray-300 hover:bg-gray-300 text-center text-blue-600'>Unfollow</li>
          <li className='border-b-[1px] border-gray-300 hover:bg-gray-300 text-center '>Report</li>
          <li className='border-b-[1px] border-gray-300 hover:bg-gray-300 text-center text-red-600'>Delete</li>
           </ul>
      </div>
    </div>
  )
}

export const PostShare = ({onClose}) => {
  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50 p-4'>
      <div className='w-full max-w-md bg-white rounded-lg shadow-xl overflow-hidden'>
        {/* Header */}
        <div className='bg-gray-100 p-4 flex justify-between items-center'>
          <div className='font-bold text-lg'>Share Post</div>
          <button 
            onClick={onClose}
            className='text-gray-500 hover:text-gray-800'
          >
            <CloseIcon />
          </button>
        </div>
        
        {/* User List */}
        <div className='max-h-[300px] overflow-y-auto p-4'>
          <div className='grid grid-cols-4 gap-4'>
            {[...Array(12)].map((_, index) => (
              <div 
                key={index}
                className='flex flex-col items-center cursor-pointer hover:bg-gray-100 p-2 rounded-lg'
              >
                <div className='relative'>
                  <img 
                    src={img} 
                    className='w-14 h-14 rounded-full object-cover border-2 border-gray-300'
                    alt={`User ${index + 1}`}
                  />
                  <div className='absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white'></div>
                </div>
                <span className='mt-2 text-xs text-center truncate w-full'>
                  User {index + 1}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Link Section */}
        <div className='bg-gray-50 p-4 border-t'>
          <div className='flex items-center'>
            <input
              type='text'
              value='http://localhost:5173'
              readOnly
              className='flex-1 p-2 border rounded-l-lg text-sm truncate bg-white'
            />
            <button 
              className='bg-gray-900 hover:bg-gray-600 text-white px-4 py-2 rounded-r-lg'
              onClick={() => navigator.clipboard.writeText('http://localhost:5173')}
            >
              Copy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default {
  PostSetting,
  PostShare
}
