import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

const Login = ({ setIsAuthenticated }) => {
    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const response = await fetch('http://localhost:8000/api/login', { // Fixed endpoint
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify({
                    username: credentials.username,
                    password: credentials.password
                }),
                credentials: 'include' // Required for cookies
            });

            const data = await response.json();
            
             if (response.ok) {
                // Update these lines:
                setIsAuthenticated(true);
                setUserData(data.user);
                localStorage.setItem('user', JSON.stringify(data.user));
                navigate('/');
            }         
            
        } catch (err) {
            setError(err.message || 'Invalid username or password');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='fixed inset-0 bg-opacity-30 backdrop-blur-sm flex justify-center items-center'>
            <div className='w-[400px] h-[400px] flex justify-center items-center p-2 rounded-xl shadow-lg'
                style={{
                    background: "linear-gradient(73deg, rgba(53, 49, 59, 1) 50%, rgba(214, 180, 245, 1) 50%)"
                }}
            >
                <div className='w-full p-4'>
                    <section className='text-4xl text-center mb-6 text-white'>Login</section>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="username"
                            placeholder='@username'
                            className='mt-2 w-full p-2 rounded-md bg-white/10 backdrop-blur text-white placeholder-gray-300'
                            value={credentials.username}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder='password'
                            value={credentials.password}
                            onChange={handleChange}
                            className='mt-3 w-full p-2 rounded-md bg-white/10 backdrop-blur text-white placeholder-gray-300'
                            required
                        />
                        
                        {error && <p className='text-red-400 text-center mt-3'>{error}</p>}
                        
                        <p className='text-center mt-4 text-gray-300'>
                            Don't have an account?{' '}
                            <Link to="/register" className='text-purple-300 font-medium ml-1 hover:text-white'>
                                Register Here
                            </Link>
                        </p>
                        
                        <button 
                            type="submit" 
                            disabled={isLoading}
                            className="mt-4 w-full bg-gray-900 hover:bg-slate-800 text-white py-2 rounded-md flex items-center justify-center disabled:opacity-50"
                        >
                            {isLoading ? (
                                <CircularProgress size={24} color="inherit" />
                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;