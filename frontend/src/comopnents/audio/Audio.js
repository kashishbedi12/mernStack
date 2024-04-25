import './Audio.css';
import Navbar from './Navbar';
import ChatBox from './ChatBox';


function Audio(props) {

  const userImgUrl="https://cdn-icons-png.flaticon.com/512/3177/3177440.png";
  const audioImgUrl='https://cdn-icons-png.flaticon.com/512/3039/3039488.png';

  let auth=localStorage.getItem("user");
  auth=JSON.parse(auth);


  return (
    <div className='container'>
      <Navbar />
      <div className="chatCont">
        <ChatBox username={auth.nickname} userImg={userImgUrl} audioImg={audioImgUrl}/>
      </div>

    </div>
  );
}

export default Audio;
