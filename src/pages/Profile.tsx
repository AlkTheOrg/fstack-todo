import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import "../styles/Profile.scss"

const Profile = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || (user && !user.id)) {
      navigate('/login');
    }
  }, [navigate, user])

  return (
    <div>Profile</div>
  )
}

export default Profile
