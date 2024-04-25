import React, {  useState } from 'react';
import './Login.css'
import LoginCont from './LoginCont';
import LoginImg from './LoginImg';
import SignupCont from './SignupCont';


export default function (props) {

  const [signin, setSignin] = useState(1);
  function toggle() {
    signin ? setSignin(0) : setSignin(1);
    console.log(signin);
  }

  return (
    <>
      <div className="loginMainCont">

        <div className="LoginImg">
          <LoginImg />
        </div>
        {
          signin ? <div className="LoginCont" >
            <LoginCont setUsername={props.setUsername} setNickname={props.setNickname} setBio={props.setBio} setFollower={props.setFollower} setFollowing={props.setFollowing} />
            <p className="or or2 contEle contEle2">-----or-----</p>
            <p className="text text2 contEle contEle2">New user?
              <span className="span" onClick={toggle} >Sing up</span>
            </p>
          </div>
            : <div className="SignupCont" >
              <SignupCont setUsername={props.setUsername} setNickname={props.setNickname} setBio={props.setBio} setFollower={props.setFollower} setFollowing={props.setFollowing} />
              <p className="or or2 contEle contEle2">-----or-----</p>
              <p className="text text2 contEle contEle2">Already have an account?
                <span className="span" onClick={toggle} >Sing in</span>
              </p>
            </div>
        }

      </div>
    </>
  );
}

