import React, { useEffect, useState, useRef } from "react";
import './VideoBox.css'
import './ChatBox.css'
import MsgRecieved from './MsgRecieved';
import MsgSent from './MsgSent';
import useWebSocket from "react-use-websocket";

export default function (props) {

    const [addFriendFlag, setAddFriendFlag] = useState(1);
    const [msg, setmsg] = useState('');
    const [msgList, setMsgList] = useState([]);
    const [cansend,setcansend]=useState(false);


    const [peerConnection, setPeerConnection] = useState(new RTCPeerConnection(configuration));
    const [localid, setLocalid] = useState(0);
    const [remoteid, setRemoteid] = useState(0);


    // const [negoflag,setNegoflag]=useState(false);

    let inputonchange = (e) => {
        let t = e.target.value;
        setmsg(t);
        // console.log(msg);
    }

    let sendmsg = () => {
        console.log('sennd btn click', msg);
        if(cansend){
            dataChannel.send(msg);
            let newElement = <MsgSent key={msgList.length} sentTextMsg={msg} />;
            setMsgList([...msgList, newElement]);
        }
        setmsg("");
    }

    const [connection, setConnection] = useState(false);

    let localidx = 0;
    let remoteidx = 0;
    const dataChannelName = 'strangle'
    var dataChannel;
    var configuration = {
        iceServers: [{
            urls: ['stun:stun.l.google.com:19302']
        }]
    };


    function addFriendClick() {
        if (addFriendFlag) setAddFriendFlag(0);
        else setAddFriendFlag(1);
    }

    let handleConnect = async () => {
        props.changeChatBtnClick();
        console.log('new btn click');
        setPeerConnection(new RTCPeerConnection(configuration));
        sendJsonMessage({ type: 'adduser' });
        // let newElement =<StrangerConnectionStatus key={msgList.length} strangerConnectionStatus={-1} />;
        // setMsgList([...msgList, newElement]);
    }

    let handleDisconnect = async () => {
        props.changeChatBtnClick();
        console.log('find btn click');
        peerConnection.close();
        localidx=localid;
        remoteidx=remoteid;
        console.log('localidx',localidx);
        sendJsonMessage({ type: 'removeuser', localidx });
        setPeerConnection(null);
        setConnection(false);
        setcansend(false);
    }

    let handleonopen = async () => {
        console.log('connection open');
    }

    let handleonmessage = async (e) => {
        let data = JSON.parse(e.data);
        // console.log('message', data);

        if (data.type == 'waiting') {
            console.log('user added', data.idx)
        }

        else if (data.type === 'connect') {
            localidx = data.localidx;
            remoteidx = data.remoteidx;
            console.log('user added');
            await addIds(data.localidx, data.remoteidx);
            if (data.createoffer) {
                let type = 'offer';
                let offer = await createoffer();
                console.log("sending offer");
                sendJsonMessage({ type, offer, localidx, remoteidx });
            }
        }

        else if (data.type === 'removeuser') {
            if (data.success) {
                console.log('user removed');
            }
            else console.log('user not found');
        }

        else if (data.type === 'offer') {
            console.log('offer recieved');
            await peerConnection.setRemoteDescription(data.offer);

            let answer = await createanswer();
            let type = 'answer';
            localidx = data.remoteidx;
            remoteidx = data.localidx;
            sendJsonMessage({ type, answer, remoteidx });

            // console.log('localDiscription', peerConnection.localDescription);
            // console.log('remoteDiscription', peerConnection.remoteDescription);
        }

        else if (data.type === 'answer') {
            console.log('answer recieved');
            await peerConnection.setRemoteDescription(data.answer);

            // console.log('localDiscription', peerConnection.localDescription);
            // console.log('remoteDiscription', peerConnection.remoteDescription);

        }

        else if (data.type == 'candidate') {
            let candidate = data.candidate;
            await peerConnection.addIceCandidate(candidate);
            console.log('candidate recieved');
        }

        else if (data.type == 'error') {
            console.log(data.message);
        }

        else {
            console.log("Default client case");
        }

    }

    const { sendJsonMessage, getWebSocket } = useWebSocket('ws://localhost:5000', {
        onOpen: handleonopen,
        onClose: () => console.log('WebSocket connection closed.'),
        shouldReconnect: (closevent) => true,
        onMessage: handleonmessage
    });


    let addIds=async(l,r)=>{
        setLocalid(l);
        setRemoteid(r);
    }

    let createoffer = async () => {
        
        let offer = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(offer)
        console.log('offer created', offer);
        return offer;
    }

    let createanswer = async () => {
        let answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);
        console.log('answer created');
        return answer;
    }

    let firstmsg=true;

    if(peerConnection!=null)dataChannel = peerConnection.createDataChannel(dataChannelName);

    if(dataChannel)dataChannel.onopen = async (e) => {
        console.log('chanel open');
        dataChannel.send('message for testing the connection')
    }

    if(dataChannel)dataChannel.onmessage = async (m) => {
        if(firstmsg){
            await addtracks();
            firstmsg=false
        }
        if(m.data!='message for testing the connection'){
            let newElement =<MsgRecieved key={msgList.length} recievedTextMsg={m.data} />;
            setMsgList([...msgList, newElement]);
        }
        // console.log('message', m.data);
    }

    if(peerConnection!=null)peerConnection.addEventListener('datachannel', async (e) => {
        let dc = e.channel;
        dc.onmessage = async (m) => {
            if(firstmsg){
                await addtracks();
                firstmsg=false
            }
            if(m.data!='message for testing the connection'){
                let newElement =<MsgRecieved key={msgList.length} recievedTextMsg={m.data} />;
                setMsgList([...msgList, newElement]);
            }
            // console.log(m.data);
        }
    });


    if(peerConnection!=null)peerConnection.onicecandidate = (e) => {
        console.log('ice');
        if (e.candidate) {
            let type = 'candidate';
            let candidate = e.candidate;
            localidx = localid;
            remoteidx = remoteid;
            sendJsonMessage({ type, localidx, remoteidx, candidate });
        }
    };


    if(peerConnection!=null)peerConnection.onnegotiationneeded = async (e) => {
        // console.log('negotiation called');
        if (negoflag) {
            console.log('negotiation occured');
            let type = 'offer';
            localidx = localid;
            remoteidx = remoteid;
            let offer = await createoffer();
            console.log('sending offer');
            sendJsonMessage({ type, offer, localidx, remoteidx });
            // setNegoflag(false);
            negoflag = false;
        }
    };


    if(peerConnection!=null)peerConnection.ontrack=async(e) => {
        let stream = e.streams[0];
        if(e.track.kind=='video'){
            remoteVideo=stream;
            if(remotevideoRef.current){
                remotevideoRef.current.srcObject = remoteVideo;
                // console.log('remoteVideo',remoteVideo);
            }
        }
        else if(e.track.kind=='audio'){
            remoteAudio=stream;
            if(remoteaudioRef.current){
                remoteaudioRef.current.srcObject=remoteAudio;
                // console.log('remoteAudio',remoteAudio);
            }
            
        }

        else {
            console.log('tracks else part');
        }

        // console.log(`${localName} track: `,e);

    };


    let localstream;
    let remoteVideo;
    let remoteAudio;


    const videoRef = useRef(null);
    const remotevideoRef=useRef(null);
    const remoteaudioRef=useRef(null);

    let negoflag = false;
    let addtracks = async (e) => {
        setcansend(true);
        negoflag = true;
        localstream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        // console.log('stream',localstream)
        if (videoRef.current) {
            videoRef.current.srcObject = localstream;
        }
        let tracks = localstream.getTracks();
        tracks.forEach((track) => {
            console.log(' local track adding');
            peerConnection.addTrack(track, localstream);
        });
        // console.log('localstream', localstream);

    }




    return (
        <>
        <div className="chatBoxBox">
            <div className="chatBoxCont">
                <div className='infoCont chatBoxContEle'>
                    <div className="leftInfoCont infoContEle">
                        <img className="userImage leftInfoContEle" src={props.userImg} alt="userImg" />
                        <span className="usernameText leftInfoContEle">Stranger</span>
                    </div>
                    <div className="rightInfoCont infoContEle">
                        {addFriendFlag ? <button onClick={addFriendClick} className=" addFriendBtn ">Add Friend</button> :
                            <button onClick={addFriendClick} className=" addFriendBtn cancelAddFriend">Cancel</button>}
                    </div>

                </div>
                <div className='msgCont chatBoxContEle'>
                    {msgList}
                </div>
                <div className='typeCont chatBoxContEle'>
                    <div className="newChatBtnCont typeContEle">
                        {
                            props.chatChangeBtnNo ? <button className="chatBtn changeChatBtn findChatBtn changeChatConfirmBtn" onClick={handleDisconnect}>Find</button>
                                : <button className="chatBtn changeChatBtn newChatBtn" onClick={handleConnect}>New</button>
                        }
                    </div>
                    <div className="msgBtnCont typeContEle">
                        <input type="text" className="chatMsgInput" value={msg} onChange={inputonchange} placeholder='Say "Hi"' />
                        <button className="chatBtn sendMsgBtn" onClick={sendmsg} >Send</button>
                    </div>

                </div>
            </div>
            <div className='videoBoxCont'>
                <div className="liveVideoCont strangerLiveVideoCont">
                    <video className='strangerVideo video' id='strangerVideo' ref={remotevideoRef} autoPlay playsInline ></video>
                    <audio className='strangerAudio audio' style={{'display':'none'}} id='strangerAudio'ref={remoteaudioRef}></audio>
                </div>
                <div className="liveVideoCont userLiveVideoCont">
                    <video className='userVideo video' id='userVideo' ref={videoRef} autoPlay playsInline ></video>
                </div>
            </div>
        </div>
        </>
    );
}