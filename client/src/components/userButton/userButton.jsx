import { useState } from 'react';
import './userButton.css';
import Image from'../image/image';
import apiRequest from '../../utils/apiRequest';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../utils/authStore';
import { Link } from 'react-router-dom';
import { getImageProps } from '../../utils/getImageProps';

const UserButton = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  /* Temp */

  /* const currentUser =true; */

   const { currentUser , removeCurrentUser} = useAuthStore();

   console.log(currentUser);

  const handleLogout = async() => {
    try{
    await apiRequest.post("/users/auth/logout",{})
    removeCurrentUser();
    navigate("/auth")
  }catch(err){
    console.log(err);
  }
 }
  return currentUser ? (
    <div className="userButton">
  <Image {...getImageProps(currentUser.img || "/general/noAvatar.png")} alt="" />
  <div onClick={() => setOpen ((prev) => !prev)}>
  <Image {...getImageProps("/general/arrow.svg")} alt='' 
  className='arrow'/>
  </div>
      {open &&(
      <div className="userOptions">
        <Link to={`/profile/${currentUser.username}`} className="userOption">Profile</Link>
        <div className="userOption">Setting</div>
        <div className="userOption" onClick={handleLogout}>Logout</div> 
      </div>
      )}
    </div>
  ) : (
    <Link to='/auth' className='loginLink'>
    Login / Sign up 
    </Link>
  );
};

export default UserButton;