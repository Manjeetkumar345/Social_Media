import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import CircularProgress from '@mui/material/CircularProgress';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    profileName: '',
    description: '',
    profileMedia: null
  });
  const [duplicateField, setDuplicateField] = useState(null);
  const [mediaType, setMediaType] = useState('img');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setDuplicateField(null);

    // Basic validation
    if (!formData.username || !formData.email || !formData.password || !formData.profileName) {
      setError('All fields are required');
      setIsLoading(false);
      return;
    }

    try {
      // Create FormData for registration
      const formDataObj = new FormData();
      formDataObj.append('username', formData.username);
      formDataObj.append('email', formData.email);
      formDataObj.append('password', formData.password);
      formDataObj.append('profileName', formData.profileName);
      formDataObj.append('description', formData.description);
      
      if (formData.profileMedia) {
        formDataObj.append('profileMedia', formData.profileMedia);
      }

      // Send all data to backend in one request
      const response = await fetch('http://localhost:8000/api/register', {
        method: 'POST',
        body: formDataObj,
        credentials: 'include' // REQUIRED for cookies
      });

      const result = await response.json();

      if (response.status === 409) {

        setDuplicateField(result.field);
        setError(result.msg);
      } else if (response.ok) {
        // Registration complete
          // Automatically log in user after registration
      setIsAuthenticated(true);

      setUserData(result.user);  // Change during Verification 

      localStorage.setItem('user', JSON.stringify(result.user));

      navigate('/'); // Redirect to home page
      } else {
        setError(result.msg || 'Registration failed. Please try again.');
      }
    } catch (err) {
      setError('Registration failed due to network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear duplicate error when user types
    if ((name === 'username' && duplicateField === 'username') || 
        (name === 'email' && duplicateField === 'email')) {
      setDuplicateField(null);
      setError('');
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, profileMedia: e.target.files[0] }));
    }
  };

  return (
    <div className='fixed inset-0 bg-opacity-30 backdrop-blur-sm flex justify-center items-center'>
      <div className='w-[400px] h-[500px] flex justify-center items-center p-2 rounded-xl shadow-lg'
        style={{
          background: "linear-gradient(73deg, rgba(53, 49, 59, 1) 50%, rgba(214, 180, 245, 1) 50%)"
        }}
      >
        <div className='w-full px-4'>
          <section className='text-4xl text-center text-white mb-4'>Register</section>
          
          {error && (
            <p className={`text-center mb-3 p-2 rounded ${
              duplicateField ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
            }`}>
              {error}
            </p>
          )}
          
          <form onSubmit={handleSubmit} encType='multipart/form-data'>
            <div className="mb-3">
              <input
                type="text"
                name="username"
                placeholder='@username'
                className={`w-full p-2 rounded-md bg-white/10 backdrop-blur text-white placeholder-gray-300 ${
                  duplicateField === 'username' ? 'border-2 border-red-500' : ''
                }`}
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="mb-3">
              <input
                type="email"
                name="email"
                placeholder='Email'
                className={`w-full p-2 rounded-md bg-white/10 backdrop-blur text-white placeholder-gray-300 ${
                  duplicateField === 'email' ? 'border-2 border-red-500' : ''
                }`}
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="mb-3">
              <input
                type="password"
                name="password"
                placeholder='Password'
                className='w-full p-2 rounded-md bg-white/10 backdrop-blur text-white placeholder-gray-300'
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="mb-3">
              <input
                type="text"
                name="profileName"
                placeholder='Profile Name'
                className='w-full p-2 rounded-md bg-white/10 backdrop-blur text-white placeholder-gray-300'
                value={formData.profileName}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="mb-3">
              <textarea
                name="description"
                placeholder='Write about yourself'
                className='w-full p-2 rounded-md bg-white/10 backdrop-blur text-white placeholder-gray-300 min-h-[100px]'
                value={formData.description}
                onChange={handleChange}
              />
            </div>
            
            <div className='mb-3'>
              <label className='flex items-center text-purple-300 cursor-pointer'>
                <AddAPhotoIcon className='mr-1' />
                Add Profile Media
              </label>
              
              <select 
                value={mediaType}
                onChange={(e) => setMediaType(e.target.value)}
                className='w-full mt-1 p-2 rounded-md bg-white/10 backdrop-blur text-white'
              >
                <option value="img">Photo</option>
                <option value="vid">Video</option>
              </select>
              
              <input
                type="file"
                accept={mediaType === 'img' ? 'image/*' : 'video/*'}
                className='mt-2 w-full text-white text-sm'
                onChange={handleFileChange}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className='w-full bg-gray-900 hover:bg-slate-800 text-white py-2 rounded-md flex items-center justify-center disabled:opacity-50'
            >
              {isLoading ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                'Complete Registration'
              )}
            </button>
            
            <p className='text-center text-gray-300 mt-3'>
              Already have an account? 
              <Link to="/login" className='text-purple-300 ml-1 hover:text-white'>Login Here</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;