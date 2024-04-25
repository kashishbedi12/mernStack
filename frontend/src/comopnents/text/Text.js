import './Text.css';
import Navbar from './Navbar';
import ChatBox from './ChatBox';


function Text(props) {

  const userImgUrl="https://cdn-icons-png.flaticon.com/512/3177/3177440.png";

  let auth=localStorage.getItem("user");
  auth=JSON.parse(auth);


  return (
    <div className='container'>
      <Navbar />

      <div className="chatCont">
        <ChatBox username={auth.nickname} userImg={userImgUrl}/>
      </div>

    </div>
  );
}

export default Text;
