const server = require('ws').Server;
const ws = new server({ port: 5000 });

let idx=0;
let users={};
let waitingidx=0;
ws.on('connection',async function (socket) {

    console.log('server connected');
    socket.on('message',async(data)=>{
        if (data instanceof Buffer) {
            data = data.toString('utf8');
        }
        data=JSON.parse(data);
        // console.log(data);
        // console.log(data.type);
        let type;
        let success;

        if (data.type == 'adduser') {
            idx=idx+1;
            users[idx]=socket;
            
            if(waitingidx!=0){
                type='connect';
                users[idx].send(JSON.stringify({type,createoffer:false,localidx:idx,remoteidx:waitingidx}));
                users[waitingidx].send(JSON.stringify({type,createoffer:true,localidx:waitingidx,remoteidx:idx}));
                waitingidx=0;
            }
            else {
                waitingidx=idx;
                socket.send(JSON.stringify({type:'waiting',idx:waitingidx}))
            }
        }

        else if (data.type == 'removeuser') {
            type=data.type;
            if(data.localidx==waitingidx)waitingidx=0;
            if(users[data.localidx]){
                delete users[data.localidx];
                success=true;
            }
            else{
                success=false; 
                console.log('user not removed');
            } 
            socket.send(JSON.stringify({type,success}));
        }

        else if(data.type == 'offer'){
            console.log('offer recieved');
            if(users[data.remoteidx])users[data.remoteidx].send(JSON.stringify(data));
            else socket.send(JSON.stringify({type:'error',message:'Error offer : remoteidx not found'}));
        }
        
        else if(data.type=='answer'){
            console.log('answer recieved');
            users[data.remoteidx].send(JSON.stringify(data));
        }

        else if(data.type=='candidate'){
            users[data.remoteidx].send(JSON.stringify(data));
        }

        else {
            console.log('Default server case');
        }
    });
});