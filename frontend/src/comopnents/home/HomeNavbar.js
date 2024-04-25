import { useNavigate } from 'react-router-dom';
import './HomeNavbar.css';

export default function (props) {

    const navigate = useNavigate();

    const imgUrl = "https://img.freepik.com/free-vector/cute-valentine-s-day-love-birds-couple_52683-54991.jpg?t=st=1679737645~exp=1679738245~hmac=29dcb108403f754320fb898e5a2c41e80c105845853360116303a3e1d0b99476";
    const homeIconUrl = "https://cdn-icons-png.flaticon.com/512/1946/1946488.png";
    const profileIconUrl = "https://cdn-icons-png.flaticon.com/512/1144/1144760.png";
    const friendsIconUrl = 'https://cdn-icons-png.flaticon.com/512/1500/1500455.png';
    const chatIconUrl = 'https://cdn-icons-png.flaticon.com/512/3193/3193015.png';
    const searchIconUrl = 'https://cdn-icons-png.flaticon.com/512/54/54481.png';
    const logoutIconUrl = 'https://cdn-icons-png.flaticon.com/512/1828/1828427.png';
    const loginIconUrl = 'https://cdn-icons-png.flaticon.com/512/1828/1828395.png';

    function handleLogoutNavClick() {
        localStorage.clear();
        navigate('/');
    }

    function handleLoginNavClick() {
        localStorage.clear();
        navigate('/');
    }

    function handleSelectChange(e) {
        let v = e.target.value;
        if (v == 'home') props.handleHomeNavClick();
        else if (v == 'profile') props.handleProfileNavClick();
        else if (v == 'friends') props.handleFriendNavClick();
        else if (v == 'chat') props.handleChatNavClick();
        else if (v == 'search') props.handleSearchNavClick();
        else if (v == 'logout') handleLogoutNavClick();
        else if (v == 'login') handleLoginNavClick();
    }

    let auth = localStorage.getItem("user");


    return (
        <>
            <div className="homeNavCont">

                <div className='leftNavCont'>
                    <span className='homeNavImgCont'>
                        <img className='logo homeNavImg' src={imgUrl} alt="logo" />
                    </span>
                    <span className='titleHome'>Strangle.in</span>
                </div>

                <div className='rightNavCont'>
                    <ul className='navUl'>
                        <li className='searchIconLi li'>
                            <span className='navLink' >Online:{props.onlineCount}</span>
                        </li>
                        <li className='homeIconLi li'>
                            <span className='navLink' onClick={props.handleHomeNavClick}  ><img className='homeIcon  icon ' src={homeIconUrl} alt="homeIcon" /></span>
                        </li>
                        <li className='profileIconLi li'>
                            <span className='navLink' onClick={props.handleProfileNavClick} ><img className='profileIcon  icon' src={profileIconUrl} alt="profileIcon" /></span>
                        </li>
                        <li className='friendsIconLi li'>
                            <span className='navLink' onClick={props.handleFriendNavClick} ><img className='freindsIcon icon' src={friendsIconUrl} alt="friendsIcon" /></span>
                        </li>
                        <li className='chatIconLi li'>
                            <span className='navLink' onClick={props.handleChatNavClick}  ><img className='chatIcon icon' src={chatIconUrl} alt="chatIcon" /></span>
                        </li>
                        <li className='searchIconLi li'>
                            <span className='navLink' onClick={props.handleSearchNavClick} ><img className='searchIcon icon' src={searchIconUrl} alt="searchIcon" /></span>
                        </li>
                        <li className='logoutIconLi li'>
                            {auth ? <span className='navLink'  ><img className='searchIcon icon' onClick={handleLogoutNavClick} src={logoutIconUrl} alt="logoutIcon" /></span> : <span className='navLink'  ><img className='searchIcon icon' onClick={handleLoginNavClick} src={loginIconUrl} alt="logoinIcon" /></span>}
                        </li>
                    </ul>
                    <select className='navSelect' onChange={handleSelectChange}>
                        <option className='navSelectOption' value="home">
                            Home
                        </option>
                        <option className='navSelectOption' value="profile">
                            Profile
                        </option>
                        <option className='navSelectOption' value="friends">
                            Friends
                        </option>
                        <option className='navSelectOption' value="chat">
                            Chat
                        </option>
                        <option className='navSelectOption' value="search">
                            Search
                        </option>
                        {
                            auth ? <option className='navSelectOption' value="logout">Logout</option>
                                : <option className='navSelectOption' value="login">Login</option>
                        }
                        <option className='navSelectOption' value="onlineCount">
                            Online:{props.onlineCount}
                        </option>
                    </select>
                </div>

            </div>
        </>
    );
}