import './ProfilePage.css'

export default function(props){
    return(
        <>
            <div className="profileCont">
                <div className="profileLside profileContEle">
                    <img className='profileImg profileLsideEle'  src={props.imageUrl} alt="Profile Image" />
                </div>
                <div className="profileRside profileContEle">
                    <p className='profileName profileRsideEle'>{props.username}({props.nickname})</p>
                    <p className='profileFollow profileRsideEle'><a className='follow followLink' href='/'>Followers </a> : {props.follow}</p>
                    <p className='profileFollower profileRsideEle'><a className='following followLink' href='/'>Following </a> : {props.following}</p>
                    <p className='profileBio profileRsideEle'><span className='profileBioTitle'>Bio : </span> {props.bio}</p>
                </div>
                
            </div>
        </>
    );
}