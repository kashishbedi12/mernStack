import './MsgRecieved.css'

export default function(props){
    return(
        <>
            <div className="msgRecievedCont">
                <div className="msgRecievedBox">
                    {props.recievedTextMsg}
                </div>
            </div>
        </>
    );
}