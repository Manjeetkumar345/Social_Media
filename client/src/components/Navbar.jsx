import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import AddPost from './AddPost';
// import PersonIcon from '@mui/icons-material/Person';

const Navbar = ({ onSearchToggle }) => {
  const [addPost,setAddPost] = useState(false);
  const NavItems = [
    { to: "/", label: "Home", icon: <HomeIcon /> },
    { to: "/post", label: "Post", icon: <ExploreIcon /> },
    { to: "/profile", label: "Profile", icon: <PersonIcon /> },
    // { to: "/logout", label: "LogOut", icon: <AddIcon /> },
    // { to: "/login", label: "Login", icon: <PersonIcon /> },
  ]
  
  return (
    <>
      {/* Desktop Navbar (Left Side) */}
      {addPost && <AddPost onClose={() => setAddPost(false)} />}
      <ul className="bg-black h-full lg:w-[171px] w-50 text-white p-1 sm:pt-[100px] fixed top-0 left-0 hidden sm:block">
        {NavItems.map((item, index) => (
          <li 
            key={index} 
            className="m-1 hover:bg-gray-100 hover:bg-opacity-20 rounded-sm"
          >
            <Link 
              to={item.to} 
              className="flex items-center  p-2 text-white no-underline hover:text-white"
            >
              {React.cloneElement(item.icon, { className: "mr-2 text-2xl" })}
              <span className='lg:block hidden'>{item.label}</span>
            </Link>
          </li>
        ))}
          <li className="m-1 hover:bg-gray-100 hover:bg-opacity-20 rounded-sm"
          onClick={()=>setAddPost(true)}
          >
            <AddIcon/> AddPost
          </li>
        <li 
          className="m-1 hover:bg-gray-100 hover:bg-opacity-20 rounded-sm cursor-pointer"
          onClick={onSearchToggle}
        >
          <div className="flex items-center p-2 text-white">
            <SearchIcon className="mr-2 text-2xl" />
            <span className='lg:block hidden '>Search</span>
          </div>
        </li>
      </ul>

      {/* Mobile Navbar (Bottom) */}
      <div className="fixed bottom-0 w-full sm:hidden z-50 bg-black border-t border-gray-800">
        <ul className='h-16 flex justify-around items-center px-2'>
          {NavItems.map((item, index) => (
            <li 
              key={index}
              className="flex-1 text-center hover:bg-gray-100  hover:bg-opacity-20 rounded-lg"
            >
              <Link 
                to={item.to} 
                className="flex justify-center items-center h-full p-2 text-white"
              >
                {React.cloneElement(item.icon, { 
                  style: { fontSize: '1.75rem' },
                  className: "hover:text-gray-400" 
                })}
              </Link>
            </li>
          ))}
            <li className="flex-1 text-center hover:bg-gray-100  hover:bg-opacity-20 rounded-lg"
            onClick={()=>setAddPost(true)}>
             <AddIcon/>
            </li>
          <li 
            className="flex-1 text-center hover:bg-gray-100 hover:bg-opacity-20 rounded-lg"
            onClick={onSearchToggle}
          >
            <button className="flex justify-center items-center h-full w-full p-2 text-white">
              <SearchIcon style={{ fontSize: '1.75rem' }} className="hover:text-gray-400" />
            </button>
          </li>
        </ul>
      </div>
    </>
  )
}

export default Navbar