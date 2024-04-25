import './MsgSent.css'

export default function(props){
    return(
        <>
            <div className="msgSentCont">
                <div className="msgSentBox">
                    {props.sentTextMsg}
                </div>
            </div>
        </>
    );
}