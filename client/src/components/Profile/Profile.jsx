import React, { useEffect, useState } from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import ProfilePost from '../mini/ProfilePost';
import defaultAvatar from "../../Images/Status.png";
import CircularProgress from '@mui/material/CircularProgress'; // Import spinner

export default function Profile() {
  const [stats, setStats] = useState({
    posts: 12,
    followers: 73353,
    following: 5356,
  });
  
  const [postModal, setPostModal] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
   const BASE_URL = "http://localhost:8000";

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await fetch(`${BASE_URL}/user/me`, {
          method: 'GET',
          credentials: 'include'
        });
        
        if (response.ok) {
          const data = await response.json();
          
          // Ensure profile photo has full URL
          const updatedProfile = {
            ...data.user,
            profilePhoto: data.user.profilePhoto 
              ? `${BASE_URL}${data.user.profilePhoto}` 
              : null
          };
          
          setProfileData(updatedProfile);
          
        }
        // Format stats
        setStats(prev => ({
          ...prev,
          displayFollower: formatNumber(prev.followers),
          displayFollowing: formatNumber(prev.following)
        }));
      } catch (error) {
        console.error("Profile fetch error:", error);
        setError("Failed to load profile data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const updatedProfile = (newData) => {
    setProfileData(prev => ({ ...prev, ...newData }));
  }
  // Format numbers function
  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  // Handle broken images
  const handleImageError = (e) => {
    e.target.src = defaultAvatar;
  };

  // Render loading state
  if (isLoading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <CircularProgress />
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center">
        <p className="text-red-500 text-xl mb-4">{error}</p>
        <button 
          className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  // Render nothing if no data (shouldn't happen but safety check)
  if (!profileData) {
    return <div className="w-full min-h-screen flex items-center justify-center">
      <p>No profile data found</p>
    </div>;
  }

  return (
    <div className='w-full min-h-screen flex flex-col items-center pt-10'>
      {/* Profile Header Section */}
      <div className='flex-col'>
        <div className='flex sm:w-[660px] w-full sm:mb-8 mb-3'>
          <div className='p-2 mr-4'>
            <img 
              src={profileData.profilePhoto || defaultAvatar} 
              alt="Profile" 
              className='sm:h-[150px] sm:w-[150px] h-[70px] w-[70px] rounded-full object-cover'
              onError={handleImageError}
            />
          </div>
          
          <div className='flex-1'>
            <div className='flex items-center mb-4'>
              <h1 className='text-2xl mr-4'>@{profileData.username}</h1>
              <button className='px-4 py-1 bg-gray-700 border-none hover:bg-gray-600 rounded mr-2'>
                Edit Profile
              </button>
              <button className='bg-transparent p-0 hover:bg-transparent focus:outline-none border-none'>
                <SettingsIcon 
                  style={{ color: '#ffffff' }} 
                  className="hover:text-gray-300 transition-colors"
                />
              </button>
            </div>
            
            <div className='flex mb-4'>
              <span className='mr-6'><strong>{stats.posts}</strong> posts</span>
              <span className='mr-6'><strong>{stats.displayFollower}</strong> followers</span>
              <span><strong>{stats.displayFollowing}</strong> following</span>
            </div>
            
            <div className='sm:block hidden'>
              <h2 className='font-bold'>{profileData.profileName || profileData.username}</h2>
              <p>{profileData.description || "No description yet"}</p>
            </div>
          </div>
        </div>
        
        {/* Mobile view */}
        <div className='block sm:hidden ml-2 mb-4'>
          <h2 className='font-bold'>{profileData.profileName || profileData.username}</h2>
          <p>{profileData.description || "No description yet"}</p>
        </div>
      </div>

      {/* Saved Posts Grid */}
      <div className='sm:w-[660px] w-[370px] px-4 border-t-2'>
        <div className='flex items-center justify-center mr-4'>
          <h2 className='text-xl font-bold mb-4 mr-3'>Posts</h2>
          <h2 className='text-xl font-bold mb-4 mr-3'>Saved </h2>
          <h2 className='text-xl font-bold mb-4 mr-3'>Tagged</h2>
        </div>
        <div className='grid grid-cols-3 gap-1'>
          {[...Array(6)].map((_, index) => (
            <div key={index} className='sm:h-[220px] h-[150px] bg-black overflow-hidden'>
              <img 
                src={defaultAvatar} 
                alt="Post" 
                className='w-full h-full object-cover cursor-pointer'
                onClick={() => (setPostModal(true))}
              />
            </div>
          ))}
        </div>
      </div>
      
      {postModal && (
        <ProfilePost onClose={() => setPostModal(false)} />
      )}
    </div>
  );
}