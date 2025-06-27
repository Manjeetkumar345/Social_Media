import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';


const Search = ({isOpen, onClose}) => {
    const [searchquery,setSearchQuery] = useState('');
  return (
    <div className={`fixed top-0 left-0 h-full p-2 bg-black w-96 shadow-lg transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0': '-translate-x-full '
    } z-50`}>
        <div className='p-4'>
            <button
            onClick={onClose}
            className='absolute top-2 right-2 text-gray-500 hovertext-gray-700'
            >X</button>
        </div>

        <h2 className='text-xl font-bold mb-4'>Search <SearchIcon className='ml-1'/></h2>
        <input
        type='text'
        placeholder='Search....'
        value={searchquery}
        onChange={(e)=> setSearchQuery(e.target.value)}
        className='w-full p-2 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500'
        />
    </div>
  )
}

export default Search
