import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import Login from "./components/Logging/Login";
import Register from "./components/Logging/Register";
import Navbar from "./components/Navbar";
import Search from "./components/Search";
import Home from "./components/Home/Home"
import Post from "./components/Post";
import Profile from "./components/Profile/Profile"; 
import CircularProgress from '@mui/material/CircularProgress';

function App() {
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  // Check authentication status on app load
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await fetch('http://localhost:8000/user/me', {
          method: 'GET',
          credentials: 'include' // Send cookies
        });
        
        // console.log('Auth check response:', response.status); // Add this

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setIsAuthenticated(true);
          setUserData(data.user); // 
          localStorage.setItem('user', JSON.stringify(data.user));
        }
      } catch (error) {
        console.error('Auth check error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  // Show loading spinner while checking auth status
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  // Temporary logout handler (to be replaced later)
  const handleTemporaryLogout = () => {
    // For now, just clear the frontend state
    setIsAuthenticated(false);
    setUserData(null);
    localStorage.removeItem('user');
    
    // In a real implementation, we would also:
    // 1. Clear the backend cookie
    // 2. Redirect to login
    alert("Logout functionality will be implemented soon!");
  };

  return (
    <div className="w-screen h-screen overflow-x-hidden text-white"
      style={{
        background: "linear-gradient(73deg, rgba(53, 49, 59, 1) 50%, rgba(214, 180, 245, 1) 50%)"
      }}
    >
      <Router>
        {/* Only show navbar when authenticated */}
        {isAuthenticated && (
          <>
            <Navbar 
              user={userData} 
              onSearchToggle={() => setSearchOpen(!isSearchOpen)} 
              onLogout={handleTemporaryLogout} // Temporary solution
            />
            <Search isOpen={isSearchOpen} onClose={() => setSearchOpen(false)} />
          </>
        )}
        
        {/* Main Content Area */}
        <div className={`
          h-full overflow-y-auto
          ${isAuthenticated ? 'sm:ml-[171px]' : ''}
          ${isSearchOpen ? 'ml-[calc(171px+384px)]' : ''}
          pb-16 sm:pb-0
        `}>
          <Routes>
            <Route path="/login" element={
              !isAuthenticated 
                ? <Login 
                    setIsAuthenticated={setIsAuthenticated} 
                    setUserData={setUserData} 
                  /> 
                : <Navigate to="/" replace />
            } />
            <Route path="/register" element={
              !isAuthenticated 
                ? <Register 
                    setIsAuthenticated={setIsAuthenticated} 
                    setUserData={setUserData} 
                  /> 
                : <Navigate to="/" replace />
            } />
            
            {/* Protected routes */}
            <Route path="/" element={
              isAuthenticated 
                ? <Home user={userData} /> 
                : <Navigate to="/login" replace />
            } />
            <Route path="/post" element={
              isAuthenticated 
                ? <Post user={userData} /> 
                : <Navigate to="/login" replace />
            } />
            <Route path="/profile" element={
              isAuthenticated 
                ? <Profile user={userData} /> 
                : <Navigate to="/login" replace />
            } />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;