import React, { useState , useEffect } from 'react';
import './LoginCont.css';
import './SignupCont.css';
import {useNavigate} from 'react-router-dom';


export default function (props) {

    const navigate = useNavigate();
    useEffect(() => {
        let auth = localStorage.getItem('user');
        if (auth) {
          navigate('/home');
          console.log('user found')
        }
      });

    const [nickname, setNickname] = useState('');
    const [username, setUsername] = useState('');
    const [bio,setBio]=useState('');
    const [password, setPassword] = useState('');
    const [empty, setEmpty] = useState(1);

    const [invalidDetails, setInvalidDetails] = useState(0);
    const [userAlreadyExixts,setUserAlreadyExixts]=useState(0);

    const followers=0;
    const following=0;

    let addData = async () => {
        let n=nickname;
        let u=username;
        let b=bio;
        let p=password;
        n=n.trim();setNickname(n);
        u=u.trim();setUsername(u);
        b=b.trim();setBio(b);
        p=p.trim();setPassword(p);

        if (nickname === '' || username === '' || bio==='' || password === '') {
            setEmpty(1);
            setInvalidDetails(1);
        }
        else {
            setEmpty(0);
            // console.log(nickname + " " + username + " "+bio+" " + password);

            let res = await fetch('http://localhost:4000/signup', {
                method: 'post',
                body: JSON.stringify({ nickname, username,bio,password,followers,following }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            res = await res.json();
            let token=res.token;
            if(res.usernameExists===1)setUserAlreadyExixts(1);
            else {
                setUserAlreadyExixts(0);
                localStorage.setItem('user',JSON.stringify({username,nickname,bio,followers,following,token}));
                navigate('/home');
            }
            console.log(res);
            
        }
    }


    return (
        <div className="cont">

            <h1 className="heading  contEle contEle2">Strangle</h1>

            <p className="greet contEle contEle2">Welcome to Strangle</p>

            <div className="form contEle contEle2" action="/" method="post">

                {/* <div className="formDiv formDiv2">
                    <label className="profileImg label divEle" htmlFor="profileImg">Profile Image</label><br />
                    <input className="profileImg divEle inp" type="file" name="profileImg" id="profileImg" required/>
                </div> */}

                <div className="formDiv formDiv2">
                    <label className="nicknameLabel label divEle" htmlFor="nickname">Nickname</label><br />
                    <input className="nickname divEle inp inp2" type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} name="nicknamename" id="nickname" required />
                </div>

                <div className="formDiv formDiv2">
                    <label className="usernameLabel label divEle" htmlFor="username">Username</label><br />
                    <input className="usermane divEle inp inp2" type="text" value={username} onChange={(e) => setUsername(e.target.value)} name="username" id="usermane" required />
                    {userAlreadyExixts ? <p className='invalidDetails'>username already exists</p> : <></>}
                </div>

                <div className="formDiv formDiv2">
                    <label className="bioLabel label divEle" htmlFor="bio">Bio</label><br />
                    <textarea className="bio divEle inp inp2" id='bio' value={bio} onChange={(e) => setBio(e.target.value)} name="bio" cols="30" rows="10"></textarea>
                    

                </div>

                <div className="formDiv formDiv2">
                    <label className="passwordLabel label divEle" htmlFor="password">Password</label><br />
                    <input className="password divEle inp inp2" type="password" value={password} onChange={(e) => setPassword(e.target.value)} name="password" id="password" required />
                    {invalidDetails ? <p className='invalidDetails'>invalid details</p> : <></>}
                </div>

                <button className="btn submit formEle"  onClick={addData} ><span className="btnLink" >Sign up</span></button>
            </div>



        </div>
    );
}