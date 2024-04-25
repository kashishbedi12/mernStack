import React,{useState} from 'react';
import './Home.css';
import HomeNavbar from './HomeNavbar';
import ChatCard from './ChatCard';
import ProfileUpdate from './ProfileUpdate';
import ProfilePage from './ProfilePage';
import useWebSocket from "react-use-websocket";

export default (props)=>{

    const videoIconUrl = 'https://cdn-icons-png.flaticon.com/512/4049/4049965.png';
    const audioIconUrl = 'https://cdn-icons-png.flaticon.com/512/3178/3178167.png';
    const textIconUrl = 'https://cdn-icons-png.flaticon.com/512/3193/3193015.png';
    const nearByIconUrl = 'https://cdn-icons-png.flaticon.com/512/2838/2838912.png';

    const videoUrl='/video';
    const nearbyUrl='/nearby';
    const audioUrl='/audio';
    const textUrl='/text';

    const profileImageUrl = 'https://rukminim1.flixcart.com/image/416/416/kqfj1jk0/mousepad/n/j/9/doraemon-nobita-design-printed-mousepad-for-pc-laptop-rubber-original-imag4gyydgvdqyba.jpeg?q=70';

    const [navCount,setNavCount]=useState(0);
    // const [profileUpdateTypeCount,setProfileUpdateTypeCount]=useState(0);
    const [onlineCount,setOnlineCount]=useState(-1);

    function homeClick(){setNavCount(0);}
    function profileClick(){setNavCount(1);}
    function friendClick(){setNavCount(2);}
    function chatClick(){setNavCount(3);}
    function searchClick(){setNavCount(4);}

    // function usernameUpdateClick(){setProfileUpdateTypeCount(1);};
    // function nicknameUpdateClick(){setProfileUpdateTypeCount(2);};
    // function passwordUpdateClick(){setProfileUpdateTypeCount(3);};
    // function bioUpdateClick(){setProfileUpdateTypeCount(4);};

    let auth=localStorage.getItem("user");
    auth=JSON.parse(auth);

    let handleOpen=async(e)=>{
        console.log('home connection open');
        let type='test'
        sendJsonMessage({type});
    }

    let handleClose=async(e)=>{
        console.log('home connection close');
    }

    let handleMessage=async(e)=>{
        let data=JSON.parse(e.data)
        if(data.type=='onlineCount'){
            setOnlineCount(data.onlineCount);
        }
    }
    
    const { sendJsonMessage, getWebSocket } = useWebSocket('ws://localhost:5500', {
        onOpen: handleOpen,
        onClose: handleClose,
        shouldReconnect: (closevent) => true,
        onMessage: handleMessage
    });


    return(
        <div className='homeCont'>
            <HomeNavbar onlineCount={onlineCount} handleHomeNavClick={homeClick} handleProfileNavClick={profileClick} handleFriendNavClick={friendClick} handleChatNavClick={chatClick} handleSearchNavClick={searchClick} />

            {
                navCount==0?<div className='chatSection'>
                <div className="chatSectionFlex">
                    <div className='row1 row'>
                        <ChatCard title="Video" iconUrl={videoIconUrl} hostUrl={videoUrl} />
                        <ChatCard title="Near by" iconUrl={nearByIconUrl} hostUrl={nearbyUrl} />
                    </div>
                    <div className='row2 row'>
                        <ChatCard title="Audio" iconUrl={audioIconUrl} hostUrl={audioUrl} />
                        <ChatCard title="Text" iconUrl={textIconUrl} hostUrl={textUrl} />
                    </div>
                </div>
                </div>

                :navCount==1?<div className='profilePageContainer'>
                    <div className="profileDetailsCont">
                        <ProfilePage  imageUrl={profileImageUrl} follow={auth.follower} following={auth.following} username={auth.username} nickname={auth.nickname} bio={auth.bio} />
                        {/* <ProfileUpdate usernameUpdateClick={usernameUpdateClick} passwordUpdateClick={passwordUpdateClick} nicknameUpdateClick={nicknameUpdateClick} bioUpdateClick={bioUpdateClick} />  */}
                        <ProfileUpdate />
                    </div>
                    {/* <div className="profileDetailsUpdateCont">
                        {
                        profileUpdateTypeCount==1?<UsernameUpdate />
                        :profileUpdateTypeCount==2?<NicknameUpdate />
                        :profileUpdateTypeCount==3?<PasswordUpdate />
                        :profileUpdateTypeCount==4?<BioUpdate />
                        :<></>
                        }
                    </div> */}
                </div> 

                :<></>
            }
        </div>
    );
};