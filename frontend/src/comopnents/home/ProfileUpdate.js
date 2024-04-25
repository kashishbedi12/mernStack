import { Link } from 'react-router-dom';
import './ProfileUpdate.css'

export default function(props) {
  return(
    <>
        {/* <hr className='hr'/> */}
        <div className='profileUpdateCont '>
            {/* <p className='profileUpdateContEle'><span className='updateProfile profileUpdateContLink' >Change Profile Image</span></p> */}
            <p className='profileUpdateContEle'><span onClick={props.usernameUpdateClick} className='updateUsername profileUpdateContLink' >Change Username</span></p>
            <p className='profileUpdateContEle'><span onClick={props.nicknameUpdateClick} className='updateNickname profileUpdateContLink' >Change Nickname</span></p>
            <p className='profileUpdateContEle'><span onClick={props.passwordUpdateClick} className='updatePassword profileUpdateContLink' >Change Password</span></p>
            <p className='profileUpdateContEle'><span onClick={props.bioUpdateClick} className='updateBio profileUpdateContLink' >Change Bio</span></p>
            <p className='profileUpdateContEle'><span onClick={props.deleteAccountClick} className='deleteAcc profileUpdateContLink' >Delete Account</span></p>
            {/* <p className='profileUpdateContEle'><span className='blocklist profileUpdateContLink' >Blocklist</span></p> */}
        </div>
    </>
  );
}