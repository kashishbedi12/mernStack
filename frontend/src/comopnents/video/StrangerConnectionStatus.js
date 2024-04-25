import './StrangerConnectionStatus.css'

export default function(props){
    const strangerConnected="Connected with Stranger";//strangerConnectionStatus==1
    const strangerConnecting="Connecting with Stranger";//strangerConnectionStatus==-1
    const strangerDisconnected="Disconnected";//strangerConnectionStatus==0

    return(
        <>
            <div className="strangerConnectedCont">
                <div className="strangerConnectedBox">
                    {
                        props.strangerConnectionStatus==1?strangerConnected:props.strangerConnectionStatus==0?strangerDisconnected:strangerConnecting
                    }
                </div>
            </div>
        </>
    );
}