import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginCont.css';

export default function (props) {
    
    const navigate = useNavigate();
    useEffect(() => {
        let auth = localStorage.getItem('user');
        if (auth) {
          navigate('/home');        }
      });

    // const [connectionErr, setConnectionErr] = useState(0);
    const [invalidDetails, setInvalidDetails] = useState(0);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    

    let usernameOnChangeClick = (event) => {
        setUsername(event.target.value);
    };

    let passwordOnChangeClick = (event) => {
        setPassword(event.target.value);
    };

    function isEmpty() {
        if (username === '' || password === '') return 1;
        else return 0;

    }

    let checkUserDetails = async () => {

        let u=username;
        let p=password;
        u=u.trim();setUsername(u);
        p=p.trim();setPassword(p);

        // setConnectionErr(0);
        let empty = isEmpty();

        if (empty) { setInvalidDetails(1); }
        else {
            let res = await fetch('http://localhost:4000/signin', {
                    method: 'post',
                    body: JSON.stringify({ username, password }),
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                res = await res.json();
                if (res.isvalid===1) {
                    setInvalidDetails(0);
                    localStorage.setItem('user',JSON.stringify(res));
                    navigate('/home');
                }
                else {
                    setInvalidDetails(1);
                }
        }

    }

    return (
        <div className="cont">

            <h1 className="heading contEle">Strangle</h1>

            <p className="greet contEle">Welcome to Strangle</p>

            <div className="form contEle" >
                <div className="formDiv">
                    <label className="usernameLabel label divEle" htmlFor="username">Username</label><br />
                    <input className="usermane divEle inp" type="text" value={username} onChange={usernameOnChangeClick} name="username" id="usermane" required />
                </div>

                <div className="formDiv">
                    <label className="passwordLabel label divEle" htmlFor="password">Password</label><br />
                    <input className="password divEle inp" value={password} onChange={passwordOnChangeClick} type="password" name="password" id="password" required />
                    {invalidDetails ? <p className='invalidDetails'>invalid details</p> : <></>}
                    {/* {connectionErr == 1 ? <p className='invalidDetails'>Connection Error</p> : <></>} */}

                </div>
                <button className="btn submit formEle" onClick={checkUserDetails}><span className="btnLink" >Sign in</span></button>
            </div>

        </div>
    );
}

