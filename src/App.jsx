import { useState, useEffect } from 'react'
import './App.css'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import GetStarted from './Get-started.jsx'
import ExplorerPage from './Explorer-page.jsx'
import HomePage from './HomePage.jsx'
import SocietyHead from './Society-Head.jsx'
import SocietyMember from './Society-Member.jsx'
import About from './About.jsx'
import UserProfile from './User-profile.jsx'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [accessToken, setAccessToken] = useState(null)
  const [selectedCollege, setSelectedCollege] = useState(null)
  
  // Profile and login state management - FIXED
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userProfile, setUserProfile] = useState(null)
  const [showSetupDialog, setShowSetupDialog] = useState(false)

  // Handle login from get-started page - IMPROVED
  const handleLogin = (loginData) => {
    console.log('App handleLogin called with:', loginData);
    
    const profileData = {
      name: loginData.name || loginData.email?.split('@')[0] || 'User',
      email: loginData.email || '',
      college: loginData.college || selectedCollege || '',
      role: loginData.role || 'Student',
      joinDate: new Date().toISOString().split('T')[0],
      // Add default values for other profile fields
      phone: '',
      department: '',
      year: '',
      bio: '',
      avatar: null,
      skills: [],
      interests: [],
      societiesMember: 0,
      eventsAttended: 0,
      achievementPoints: 0
    }
    
    setIsLoggedIn(true);
    setUserProfile(profileData);
    
    console.log('Login state updated - isLoggedIn:', true, 'userProfile:', profileData);
    
    // Optional: Show setup dialog after a delay if needed
    // setTimeout(() => {
    //   setShowSetupDialog(true)
    // }, 1000)
  }

  // Debug logging to track state changes
  useEffect(() => {
    console.log('App state changed - isLoggedIn:', isLoggedIn, 'userProfile:', userProfile);
  }, [isLoggedIn, userProfile]);

  const renderCurrentPage = () => {
    switch(currentPage) {
      case 'home':
        return (
          <div>
            <HomePage />
          </div>
        );
      
      case 'about':
        return (
          <div>
            <About />
          </div>
        );
        
      case 'get-started':
        return (
          <GetStarted 
            setCurrentPage={setCurrentPage} 
            setSelectedCollege={setSelectedCollege}
            onLogin={handleLogin}
            setIsLoggedIn={setIsLoggedIn}
          />
        );
        
      case 'explorer':
        return <ExplorerPage />;
        
      case 'societyHead':
        return (
          <SocietyHead 
            setCurrentPage={setCurrentPage}
            selectedCollege={selectedCollege}
          />
        );
        
      case 'societyMember':
        return (
          <SocietyMember 
            setCurrentPage={setCurrentPage}
            selectedCollege={selectedCollege}
          />
        );
        
      case 'profile':
        return (
          <UserProfile
            userProfile={userProfile}
            setUserProfile={setUserProfile}
            onSetupComplete={() => {
              // Navigate back to appropriate page after profile setup
              console.log('Profile setup completed');
            }}
            onBackToMain={() => {
              // Navigate back to previous page
              setCurrentPage('home');
            }}
          />
        );
        
      default:
        return (
          <div>
            <HomePage />
          </div>
        );
    }
  };

  return (
    <div className="App">
      <Navbar 
        setCurrentPage={setCurrentPage} 
        currentPage={currentPage} 
        isLoggedIn={isLoggedIn}
        userProfile={userProfile}
      />
      <main className="main-content">
        {renderCurrentPage()}
      </main>
      <Footer />
    </div>
  );
}

export default App