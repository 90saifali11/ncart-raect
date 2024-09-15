import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import { auth } from '../utils/firebade';
import { signOut } from 'firebase/auth';
import './UserProfile.css'; // Import the CSS file

function UserProfile() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  // Sign out handler
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser({
        isLogin: false,
        userInfo: {},
      });
      console.log('User signed out successfully');
      navigate('/');
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  return (
    <div className="profile-container">
      <h1>User Profile</h1>
      {user.isLogin ? (
        <div>
          <img 
            src={user.userInfo?.photoURL || 'https://via.placeholder.com/100?text=Profile'} 
            alt="User Avatar" 
            className="user-avatar"
          />
          <p>Name: {user.userInfo?.email ? user.userInfo.email.slice(0, 7) : 'Anonymous'}</p>
          <p>Email: {user.userInfo?.email}</p>
          
          {/* Sign Out Button */}
          
          <button className="sign-out-button" onClick={handleSignOut}>
            Sign Out
          </button>
        </div>
      ) : (
        <p>User is not logged in.</p>
      )}
    </div>
  );
}

export default UserProfile;


