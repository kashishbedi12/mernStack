import React ,{useState} from 'react';
import './ChatBox.css'
import MsgRecieved from './MsgRecieved';
import MsgSent from './MsgSent';
import StrangerConnectionStatus from './StrangerConnectionStatus';

export default function(props){

    const [chatChangeBtnNo,setChatChangeBtnNo]=useState(1);
    const [addFriendFlag,setAddFriendFlag]=useState(1);
    const [strangerConnectionStatus, setStrangerConnectionStatus]=useState(1);

    const sentTextMsg='Msg to Be Send';
    const recievedTextMsg='Msg to Be Recieved';

    function changeChatBtnClick(){
        if(chatChangeBtnNo==1){
            setChatChangeBtnNo(2);
        }
        else if(chatChangeBtnNo==2){
            setChatChangeBtnNo(3);
        }
        else {
            setChatChangeBtnNo(1)
        }
    }

    function addFriendClick(){
        if(addFriendFlag)setAddFriendFlag(0);
        else setAddFriendFlag(1);
    }

    return(
        <>
            <div className="chatBoxCont">
                
                <div className='infoCont chatBoxContEle'>
                    <div className="leftInfoCont infoContEle">
                        <img className="userImage leftInfoContEle" src={props.userImg} alt="userImg" />
                        <span className="usernameText leftInfoContEle">{props.username}</span>
                        
                    </div>
                    <div className="rightInfoCont infoContEle">
                        {addFriendFlag?<button onClick={addFriendClick} className=" addFriendBtn ">Add Friend</button>:
                        <button onClick={addFriendClick} className=" addFriendBtn cancelAddFriend">Cancel</button>}
                        {
                            strangerConnectionStatus==1?<img className='audioImage userImage leftInfoContEle' src={props.audioImg} alt="audioImage" />:<span />
                        }
                    </div>
                    
                </div>
                <div className='msgCont chatBoxContEle'>
                    <StrangerConnectionStatus strangerConnectionStatus={-1}  />
                    <StrangerConnectionStatus strangerConnectionStatus={1}  />
                    <MsgSent  sentTextMsg={sentTextMsg}/>
                    <MsgSent  sentTextMsg={sentTextMsg}/>
                    <MsgRecieved recievedTextMsg={recievedTextMsg} />
                    <MsgRecieved recievedTextMsg={recievedTextMsg} />
                    <MsgSent  sentTextMsg={sentTextMsg}/>
                    <MsgRecieved recievedTextMsg={recievedTextMsg} />
                    <MsgSent  sentTextMsg={sentTextMsg}/>
                    <MsgRecieved recievedTextMsg={recievedTextMsg} />
                    <MsgSent  sentTextMsg={sentTextMsg}/>
                    <MsgRecieved recievedTextMsg={recievedTextMsg} />
                    <MsgSent  sentTextMsg={sentTextMsg}/>
                    <MsgRecieved recievedTextMsg={recievedTextMsg} />
                    <MsgSent  sentTextMsg={sentTextMsg}/>
                    <MsgRecieved recievedTextMsg={recievedTextMsg} />
                    <MsgSent  sentTextMsg={sentTextMsg}/>
                    <MsgRecieved recievedTextMsg={recievedTextMsg} />
                    <MsgSent  sentTextMsg={sentTextMsg}/>
                    <MsgRecieved recievedTextMsg={recievedTextMsg} />
                    <StrangerConnectionStatus strangerConnectionStatus={0} />
                </div>
                <div className='typeCont chatBoxContEle'>
                    <div className="newChatBtnCont typeContEle">
                        {
                        chatChangeBtnNo==1?<button className="chatBtn changeChatBtn findChatBtn changeChatConfirmBtn" onClick={changeChatBtnClick}>Find</button>:
                        chatChangeBtnNo==2?<button className="chatBtn changeChatBtn confirmFindChatBtn changeChatConfirmBtn" onClick={changeChatBtnClick}>Really?</button>
                        :<button className="chatBtn changeChatBtn newChatBtn" onClick={changeChatBtnClick}>New</button>
                        }
                    </div>
                    <div className="msgBtnCont typeContEle">
                        <input type="text" className="chatMsgInput"  placeholder='Say "Hi"' />
                        <button className="chatBtn sendMsgBtn">Send</button>
                    </div>

                </div>
            </div>
        </>
    );
}